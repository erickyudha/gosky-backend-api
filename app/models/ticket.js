/* eslint-disable valid-jsdoc */
'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Wishlist, {
        foreignKey: 'ticketId',
      });
      this.hasOne(models.Transaction, {
        foreignKey: 'ticketId',
      });
      this.belongsTo(models.User, {
        foreignKey: 'createdBy',
      });
      this.belongsTo(models.User, {
        foreignKey: 'updatedBy',
      });
    }
  }
  Ticket.init({
    category: DataTypes.STRING,
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    departureTime: DataTypes.DATE,
    returnTime: DataTypes.DATE,
    price: DataTypes.INTEGER,
    flightNumber: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    imageId: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    description: DataTypes.TEXT,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Ticket',
    paranoid: true,
  });
  return Ticket;
};
