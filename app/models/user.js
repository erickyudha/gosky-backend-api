/* eslint-disable valid-jsdoc */
'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Wishlist, {
        foreignKey: 'userId',
      });
      this.hasOne(models.Transaction, {
        foreignKey: 'userId',
      });
      this.hasOne(models.Notification, {
        foreignKey: 'userId',
      });
      this.hasOne(models.Ticket, {
        foreignKey: 'createdBy',
      });
      this.hasOne(models.Ticket, {
        foreignKey: 'updatedBy',
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    encryptedPassword: DataTypes.STRING,
    role: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    imageId: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'User',
    paranoid: true,
  });
  return User;
};
