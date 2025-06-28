const { User, Stock, Trade } = require('../models');

async function simulateTrades() {
  try {
    const users = await User.findAll();
    const stocks = await Stock.findAll();

    if (users.length === 0 || stocks.length === 0) {
      console.log('❌ No users or stocks to simulate trades.');
      return;
    }

    for (let i = 0; i < 10; i++) {
      const user = users[Math.floor(Math.random() * users.length)];
      const stock = stocks[Math.floor(Math.random() * stocks.length)];
      const tradeType = Math.random() < 0.5 ? 'BUY' : 'SELL';
      const quantity = Math.floor(Math.random() * 10) + 1;

      if (tradeType === 'BUY') {
        const totalPrice = stock.price * quantity;

        if (stock.availableQuantity >= quantity && user.balance >= totalPrice) {
          // Update user balance and stock quantity
          stock.availableQuantity -= quantity;
          user.balance -= totalPrice;

          await stock.save();
          await user.save();

          await Trade.create({
            userId: user.id,
            stockId: stock.id,
            type: 'BUY',
            quantity,
            price: stock.price,
          });

          console.log(`🟢 ${user.name} bought ${quantity} of ${stock.name}`);
        } else {
          console.log(`⚠️  ${user.name} could not buy ${quantity} of ${stock.name}`);
        }
      } else {
        // Check if user owns enough of the stock to sell
        const totalBought = await Trade.sum('quantity', {
          where: { userId: user.id, stockId: stock.id, type: 'BUY' },
        }) || 0;

        const totalSold = await Trade.sum('quantity', {
          where: { userId: user.id, stockId: stock.id, type: 'SELL' },
        }) || 0;

        const availableToSell = totalBought - totalSold;

        if (availableToSell >= quantity) {
          // Update stock and user balance
          stock.availableQuantity += quantity;
          user.balance += stock.price * quantity;

          await stock.save();
          await user.save();

          await Trade.create({
            userId: user.id,
            stockId: stock.id,
            type: 'SELL',
            quantity,
            price: stock.price,
          });

          console.log(`🔴 ${user.name} sold ${quantity} of ${stock.name}`);
        } else {
          console.log(`⚠️  ${user.name} tried to sell ${quantity} of ${stock.name} but owns only ${availableToSell}`);
        }
      }

      // Wait 0.5–1.5 seconds before next trade
      await new Promise((res) => setTimeout(res, Math.random() * 1000 + 500));
    }

    console.log('✅ Trade simulation complete!');
  } catch (error) {
    console.error('❌ Simulation failed:', error);
  }
}

simulateTrades();
