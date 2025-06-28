module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    name: DataTypes.STRING,
    balance: { type: DataTypes.FLOAT, defaultValue: 0 },
    loanAmount: { type: DataTypes.FLOAT, defaultValue: 0 }
  });
};
