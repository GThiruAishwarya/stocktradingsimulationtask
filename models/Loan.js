module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Loan', {
    amount: DataTypes.FLOAT
  });
};
