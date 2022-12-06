'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const timestamp = new Date();
    return queryInterface.bulkInsert('Transactions', [{
      userId: '1',
      ticketId: '1',
      amount: 1,
      bookingCode: 'string',
      createdAt: timestamp,
      updatedAt: timestamp,
    },
    {
      userId: '2',
      ticketId: '1',
      amount: 2,
      bookingCode: 'string',
      createdAt: timestamp,
      updatedAt: timestamp,
    },
    {
      userId: '3',
      ticketId: '2',
      amount: 3,
      bookingCode: 'string',
      createdAt: timestamp,
      updatedAt: timestamp,
    },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Transactions', null, {});
  },
};
