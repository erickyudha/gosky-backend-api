/* eslint-disable valid-jsdoc */
'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      this.belongsTo(models.Ticket, {
        foreignKey: 'ticketId',
      });
    }
  }
  Transaction.init({
    userId: DataTypes.INTEGER,
    ticketId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    bookingCode: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Transaction',
    paranoid: true,
  });
  return Transaction;
};
