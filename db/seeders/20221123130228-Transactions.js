'use strict';

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};
function generateBookingCode() {
  let bookingCode = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  for (let i = 0; i < 9; i++) {
    bookingCode += characters.charAt(Math.floor(Math.random() *
      characters.length));
  };
  return bookingCode;
}

const transactions = [];
const n = 300;

for (let i = 0; i < n; i++) {
  transactions.push({
    userId: randomIntFromInterval(1, 300),
    ticketId: randomIntFromInterval(1, 300),
    amount: randomIntFromInterval(1, 5),
    bookingCode: generateBookingCode(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
};


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Transactions', transactions);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Transactions', null, {});
  },
};
