'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {


  up: (queryInterface, Sequelize) => {
    const timestamp = new Date();
    return queryInterface.bulkInsert('Tickets', [{
      category: 'ONE_WAY',
      from: 'JAKARTA',
      to: 'BALI',
      departureTime: '2022-11-23 13:47:24.173+07',
      price: 1000000,
      flightNumber: 'JKBLBS001',
      imageId: 41131131,
      imageUrl: 'https://www.shutterstock.com/image-vector/three-persons-admin-icon-outline-600w-1730974165.jpg',
      description: 'penerbangan eksklusif dan elegant',
      createdAt: timestamp,
      updatedAt: timestamp,
    },
    {
      category: 'ROUND_TRIP',
      from: 'JAKARTA',
      to: 'PADANG',
      departureTime: '2022-11-23 10:47:24.173+07',
      returnTime: '2022-11-23 14:47:24.173+07',
      price: 600000,
      flightNumber: 'JKPDEC002',
      imageId: 41131131,
      imageUrl: 'https://www.shutterstock.com/image-vector/three-persons-admin-icon-outline-600w-1730974165.jpg',
      description: 'penerbangan dengan biaya terjangkau',
      createdAt: timestamp,
      updatedAt: timestamp,
    },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tickets', null, {});
  },
};
