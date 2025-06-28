const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./User')(sequelize, DataTypes);
db.Stock = require('./Stock')(sequelize, DataTypes);
db.Trade = require('./Trade')(sequelize, DataTypes);
db.Loan = require('./Loan')(sequelize, DataTypes);
db.PriceHistory = require('./PriceHistory')(sequelize, DataTypes);

db.User.hasMany(db.Trade);
db.Trade.belongsTo(db.User);

db.Stock.hasMany(db.Trade);
db.Trade.belongsTo(db.Stock);

db.Stock.hasMany(db.PriceHistory);
db.PriceHistory.belongsTo(db.Stock);

db.User.hasMany(db.Loan);
db.Loan.belongsTo(db.User);

module.exports = db;
