module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Stock', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    availableQuantity: DataTypes.INTEGER
  });
};
