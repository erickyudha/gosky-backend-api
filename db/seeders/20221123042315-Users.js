'use strict';


const bcrypt = require('bcryptjs');
const admin = require('../../config/admin');

const names = [
  'Johnny',
  'ucok',
  'rambo,',
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = 'user';
    const timestamp = new Date();
    const users = names.map((name) => ({
      name,
      email: `${name.toLowerCase()}@gmail.com`,
      encryptedPassword: bcrypt.hashSync(password),
      role: 'USER',
      imageId: 12345678,
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png',
      phone: `0812343123${Math.floor((Math.random()*99) + 1)}`,
      address: 'bandung',
      createdAt: timestamp,
      updatedAt: timestamp,
    }));

    users.push({
      name: admin.name,
      email: admin.email,
      encryptedPassword: bcrypt.hashSync(admin.password),
      role: 'ADMIN',
      imageId: 41131131,
      imageUrl: 'https://www.shutterstock.com/image-vector/three-persons-admin-icon-outline-600w-1730974165.jpg',
      phone: '081234312343',
      address: 'jakarta',
      createdAt: timestamp,
      updatedAt: timestamp,
    });

    await queryInterface.bulkInsert('Users', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
