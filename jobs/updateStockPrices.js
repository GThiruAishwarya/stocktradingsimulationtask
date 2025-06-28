const cron = require('node-cron');
const db = require('../models');
const { Stock, PriceHistory } = db;

cron.schedule('*/5 * * * *', async () => {
  try {
    const stocks = await Stock.findAll();
    for (const stock of stocks) {
      const newPrice = Math.floor(Math.random() * 100) + 1;
      await PriceHistory.create({
        stockId: stock.id,
        price: newPrice
      });
     stock.price *= Math.random() < 0.5 ? 1.1 : 0.9;
await stock.save();

    }
    console.log(`[${new Date().toLocaleTimeString()}] Stock prices updated.`);
  } catch (err) {
    console.error('Price update failed:', err.message);
  }
});
