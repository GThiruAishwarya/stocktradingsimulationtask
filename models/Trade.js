module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Trade', {
    type: DataTypes.STRING, // BUY or SELL
    quantity: DataTypes.INTEGER,
    price: DataTypes.FLOAT
  });
};
