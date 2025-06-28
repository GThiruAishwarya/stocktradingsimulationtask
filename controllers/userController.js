const db = require('../models');
const { User, Stock, Trade, Loan } = db;

// ✅ Take Loan
exports.takeLoan = async (req, res) => {
  const { userId, amount } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const totalLoan = user.loanAmount + amount;
    if (totalLoan > 100000) return res.status(400).json({ error: 'Loan limit exceeded' });

    user.balance += amount;
    user.loanAmount += amount;
    await user.save();

    await Loan.create({ userId, amount });
    res.json({ message: 'Loan granted', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Buy Stock
exports.buyStock = async (req, res) => {
  const { userId, stockId, quantity } = req.body;
  try {
    const user = await User.findByPk(userId);
    const stock = await Stock.findByPk(stockId);

    if (!user || !stock) return res.status(404).json({ error: 'User or stock not found' });

    const totalCost = stock.price * quantity;
    if (user.balance < totalCost) return res.status(400).json({ error: 'Insufficient balance' });
    if (stock.availableQuantity < quantity) return res.status(400).json({ error: 'Stock unavailable' });

    user.balance -= totalCost;
    stock.availableQuantity -= quantity;
    await user.save();
    await stock.save();

    // ✅ Log BUY trade properly
    await Trade.create({
      type: 'BUY',
      quantity,
      price: stock.price,
      UserId: user.id,
      StockId: stock.id
    });

    res.json({ message: 'Stock bought successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Sell Stock
exports.sellStock = async (req, res) => {
  const { userId, stockId, quantity } = req.body;
  try {
    const user = await User.findByPk(userId);
    const stock = await Stock.findByPk(stockId);
    if (!user || !stock) return res.status(404).json({ error: 'User or stock not found' });

    // Get total bought and sold
    const userBuys = await Trade.findAll({ where: { UserId: userId, StockId: stockId, type: 'BUY' } });
    const userSells = await Trade.findAll({ where: { UserId: userId, StockId: stockId, type: 'SELL' } });

    const totalBought = userBuys.reduce((sum, t) => sum + t.quantity, 0);
    const totalSold = userSells.reduce((sum, t) => sum + t.quantity, 0);
    const owned = totalBought - totalSold;

    if (owned < quantity) return res.status(400).json({ error: 'Not enough stocks owned' });

    const saleAmount = stock.price * quantity;
    user.balance += saleAmount;
    stock.availableQuantity += quantity;
    await user.save();
    await stock.save();

    // ✅ Log SELL trade properly
    await Trade.create({
      type: 'SELL',
      quantity,
      price: stock.price,
      UserId: user.id,
      StockId: stock.id
    });

    res.json({ message: 'Stock sold successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ User Profit Report
exports.getUserReport = async (req, res) => {
  try {
    const users = await User.findAll({ include: [Trade] });

    const report = users.map((user) => {
      const trades = user.Trades || [];
      const buy = trades.filter(t => t.type === 'BUY').reduce((sum, t) => sum + t.quantity * t.price, 0);
      const sell = trades.filter(t => t.type === 'SELL').reduce((sum, t) => sum + t.quantity * t.price, 0);
      const profit = sell - buy;
      return { user: user.name, profit };
    });

    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Top 5 Users by Profit
exports.getTopUsers = async (req, res) => {
  try {
    const users = await User.findAll({ include: [Trade] });

    const ranked = users.map((user) => {
      const trades = user.Trades || [];
      const buy = trades.filter(t => t.type === 'BUY').reduce((sum, t) => sum + t.quantity * t.price, 0);
      const sell = trades.filter(t => t.type === 'SELL').reduce((sum, t) => sum + t.quantity * t.price, 0);
      const profit = sell - buy;
      return { user: user.name, profit };
    });

    const top = ranked.sort((a, b) => b.profit - a.profit).slice(0, 5);
    res.json(top);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
