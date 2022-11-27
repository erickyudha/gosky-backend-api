const bcrypt = require('bcryptjs');
const {SALT} = require('../config/application');
const dayjs = require('dayjs');
const now = dayjs();
const isoDate = now.toISOString();


const mock = {
  RES: {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  },

  USER: {
    id: 1,
    name: 'User',
    email: `user@email.com`,
    encryptedPassword: bcrypt.hashSync('password', SALT),
    role: 'USER',
    imageId: 'image',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png',
    phone: `1234567890`,
    address: 'bandung',
    createdAt: isoDate,
    updatedAt: isoDate,
  },

  TICKET: {
    id: 1,
    category: 'ROUND_TRIP',
    from: 'JAKARTA',
    to: 'MEDAN',
    departureTime: isoDate,
    returnTime: now.add(1, 'day').toISOString(),
    price: 980000,
    flightNumber: 'AX31V',
    imageId: 'string',
    imageUrl: 'string.com/image.png',
    description: 'Lorem ipsum blbalaldanlwdj',
    createdBy: 1,
    createdAt: isoDate,
    updatedBy: 1,
    updatedAt: isoDate,
    deletedAt: isoDate,
  },


};

module.exports = mock;
