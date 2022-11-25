'use strict';
const {
  Model
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
    }
  }
  Ticket.init({
    category: DataTypes.STRING,
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    departureTime: DataTypes.DATE,
    returnTime: DataTypes.DATE,
    price: DataTypes.NUMBER,
    flightNumber: DataTypes.STRING,
    imageId: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    description: DataTypes.STRING,
    createdBy: DataTypes.NUMBER,
    updatedBy: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};