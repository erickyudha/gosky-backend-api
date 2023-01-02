'use strict';

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const transactions = [];
const n = 300;

for (let i = 0; i < n; i++) {
  transactions.push({
    userId: randomIntFromInterval(1, 20),
    ticketId: randomIntFromInterval(1, 700),
    amount: randomIntFromInterval(1, 5),
    bookingCode: 
  })
  
}


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
