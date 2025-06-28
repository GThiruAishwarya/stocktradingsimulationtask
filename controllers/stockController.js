const db = require('../models');
const { Stock, PriceHistory, Trade } = db;

exports.registerStock = async (req, res) => {
  const { name, price, availableQuantity } = req.body;
  try {
    const stock = await Stock.create({ name, price, availableQuantity });
    await PriceHistory.create({ stockId: stock.id, price });
    res.status(201).json({ message: 'Stock registered', stock });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStockHistory = async (req, res) => {
  try {
    const history = await PriceHistory.findAll({ include: Stock });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTopStocks = async (req, res) => {
  try {
    const stocks = await Stock.findAll({
      include: [{ model: Trade }],
    });

    const stockPerf = stocks.map((stock) => {
      const trades = stock.Trades || [];
      const volume = trades.reduce((sum, t) => sum + t.quantity, 0);
      return { stock: stock.name, volume };
    });

    const sorted = stockPerf.sort((a, b) => b.volume - a.volume).slice(0, 5);
    res.json(sorted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStockReport = async (req, res) => {
  try {
    const stocks = await Stock.findAll({
      include: [{ model: Trade }],
    });

    const report = stocks.map((stock) => {
      const trades = stock.Trades || [];
      const bought = trades
        .filter((t) => t.type === 'BUY')
        .reduce((sum, t) => sum + t.quantity * t.price, 0);
      const sold = trades
        .filter((t) => t.type === 'SELL')
        .reduce((sum, t) => sum + t.quantity * t.price, 0);
      const profit = sold - bought;
      return { stock: stock.name, profit };
    });

    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
