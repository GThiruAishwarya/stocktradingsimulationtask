const db = require('../models');
const { User, Stock, Trade } = db;

const simulateTrades = async () => {
  const users = await User.findAll();
  const stocks = await Stock.findAll();

  for (const user of users) {
    // Simulate 1–3 trades per user
    const tradesToDo = Math.floor(Math.random() * 3) + 1;

    for (let i = 0; i < tradesToDo; i++) {
      const stock = stocks[Math.floor(Math.random() * stocks.length)];
      const quantity = Math.floor(Math.random() * 5) + 1;
      const tradeType = Math.random() < 0.5 ? 'BUY' : 'SELL';

      try {
        if (tradeType === 'BUY') {
          const totalCost = quantity * stock.price;
          if (user.balance >= totalCost && stock.availableQuantity >= quantity) {
            await Trade.create({
              userId: user.id,
              stockId: stock.id,
              type: 'BUY',
              quantity,
              price: stock.price
            });
            user.balance -= totalCost;
            stock.availableQuantity -= quantity;
            await user.save();
            await stock.save();
            console.log(`${user.name} bought ${quantity} of ${stock.name}`);
          }
        } else {
          const buys = await Trade.findAll({ where: { userId: user.id, stockId: stock.id, type: 'BUY' } });
          const sells = await Trade.findAll({ where: { userId: user.id, stockId: stock.id, type: 'SELL' } });
          const owned = buys.reduce((sum, t) => sum + t.quantity, 0) - sells.reduce((sum, t) => sum + t.quantity, 0);

          if (owned >= quantity) {
            await Trade.create({
              userId: user.id,
              stockId: stock.id,
              type: 'SELL',
              quantity,
              price: stock.price
            });
            user.balance += quantity * stock.price;
            stock.availableQuantity += quantity;
            await user.save();
            await stock.save();
            console.log(`${user.name} sold ${quantity} of ${stock.name}`);
          }
        }
      } catch (err) {
        console.error('Trade simulation failed:', err.message);
      }
    }
  }
};

module.exports = simulateTrades;
