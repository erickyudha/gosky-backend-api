'use strict';

const dayjs = require('dayjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {


  up: (queryInterface, Sequelize) => {
    const generateRand3Digit = () => {
      return '' + Math.floor(100 + Math.random() * 900);
    };
    const generateRand1Digit = () => {
      return '' + Math.floor(1 + Math.random() * 9);
    };
    const generateRandMinutes = () => {
      return Math.floor(30 + Math.random() * 90);
    };
    const IMG_PLACEHOLDER = 'https://res.cloudinary.com/dgjwtquka/image/upload/v1664957631/sample.jpg';
    const cityList = [
      'JAKARTA', 'DENPASAR', 'YOGYAKARTA', 'SURABAYA',
      'MEDAN', 'SOLO', 'SEMARANG', 'PADANG', 'MAKASSAR',
      'PONTIANAK', 'BANJARMASIN', 'PALEMBANG',
      'BANDUNG', 'JAYAPURA',
    ];
    const categoryList = ['ONE_WAY', 'ROUND_TRIP'];
    const LOREM_IPSUM =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
      ' Aliquam nec viverra urna, sit amet sodales sem. Mauris risus est,' +
      ' porttitor vitae iaculis in, condimentum in turpis. ' +
      'Aliquam erat volutpat. In rutrum augue id orci malesuada varius.';

    const ticketArr = [];
    categoryList.forEach((category) => {
      cityList.forEach((city) => {
        cityList.forEach((city2) => {
          if (city !== city2) {
            const flightNumber =
              city.charAt(0) + city2.charAt(0) + generateRand3Digit();
            for (let i = 0; i < 2; i++) {
              const now = dayjs().add(generateRand1Digit(), 'day');
              const returnTime =
                now.add(generateRand1Digit(), 'day').toISOString();
              ticketArr.push({
                category: category,
                from: city,
                to: city2,
                departureTime: now.toISOString(),
                returnTime: (category == 'ONE_WAY') ? null : returnTime,
                price: generateRand3Digit() + '000',
                duration: generateRandMinutes(),
                flightNumber,
                imageId: 'sample',
                imageUrl: IMG_PLACEHOLDER,
                description: LOREM_IPSUM,
                createdBy: 1,
                updatedBy: 1,
                createdAt: dayjs().toISOString(),
                updatedAt: dayjs().toISOString(),
              });
            }
          }
        });
      });
    });

    return queryInterface.bulkInsert('Tickets', ticketArr);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tickets', null, {});
  },
};
