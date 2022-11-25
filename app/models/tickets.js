'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tickets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tickets.init({
    category: DataTypes.STRING,
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    departureTime: DataTypes.DATE,
    returnTime: DataTypes.DATE,
    price: DataTypes.FLOAT,
    flightNumber: DataTypes.STRING,
    imageId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    description: DataTypes.STRING,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Tickets',
    paranoid: true,
    deletedAt: 'deletedAt',
  });
  return Tickets;
};
