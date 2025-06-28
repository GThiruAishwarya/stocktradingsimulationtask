const { sequelize } = require('./models');
const { User, Stock, PriceHistory } = require('./models');

async function seed() {
  try {
    await sequelize.sync({ force: true }); // Recreate tables

    console.log('🔁 Database synced');

    // Create Users
    const users = await User.bulkCreate([
      { name: 'Alice', balance: 50000 },
      { name: 'Bob', balance: 70000 },
      { name: 'Charlie', balance: 60000 },
    ]);

    // Create Stocks
    const stocks = await Stock.bulkCreate([
      { name: 'TCS', price: 50, availableQuantity: 1000 },
      { name: 'INFY', price: 80, availableQuantity: 500 },
      { name: 'RELIANCE', price: 60, availableQuantity: 700 },
    ]);

    // Create Initial Price History
    const histories = [];

    stocks.forEach(stock => {
      histories.push({
        stockId: stock.id,
        price: stock.price,
        createdAt: new Date(),
      });
    });

    await PriceHistory.bulkCreate(histories);

    console.log('✅ Dummy data inserted successfully');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
}

seed();
