'use strict';


const bcrypt = require('bcryptjs');
const admin = require('../../config/admin');
const names = require('../names');
const namesLen = names.length;

const users = [];
const n = 50;
const defaultImg = 'https://res.cloudinary.com/dgjwtquka/image/upload/c_scale,w_24/v1672668236/gosky/profile_h8kcr5.png';
const date = new Date().toISOString();


for (let i = 0; i < n; i++) {
  const firstName = names[Math.floor(Math.random() * namesLen)];
  const lastName = names[Math.floor(Math.random() * namesLen)];
  users.push({
    name: firstName + ' ' + lastName,
    email: `${firstName}.${lastName}@gmail.com`,
    role: 'USER',
    imageId: 'default',
    imageUrl: defaultImg,
    phone: `0812343123${Math.floor((Math.random() * 99) + 1)}`,
    address: 'Indonesia',
    createdAt: date,
    updatedAt: date,
    encryptedPassword: bcrypt.hashSync('password'),
  });
};

users.push({
  name: admin.name,
  email: admin.email,
  encryptedPassword: bcrypt.hashSync(admin.password),
  role: 'ADMIN',
  imageId: 41131131,
  imageUrl: defaultImg,
  phone: '081234312343',
  address: 'Indonesia',
  createdAt: date,
  updatedAt: date,
});

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
