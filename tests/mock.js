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
    email: `user@gmail.com`,
    encryptedPassword: bcrypt.hashSync('password', SALT),
    role: 'USER',
    imageId: 'image',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png',
    phone: `1234567890`,
    address: 'bandung',
    createdAt: isoDate,
    updatedAt: isoDate,
  },

  ADMIN: {
    id: 1,
    name: 'User',
    email: `user@gmail.com`,
    encryptedPassword: bcrypt.hashSync('password', SALT),
    role: 'ADMIN',
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
    duration: 32,
    imageId: 'string',
    imageUrl: 'string.com/image.png',
    description: 'Lorem ipsum blbalaldanlwdj',
    createdBy: 1,
    createdAt: isoDate,
    updatedBy: 1,
    updatedAt: isoDate,
    deletedAt: isoDate,
  },

  NOTIFICATION: {
    id: 1,
    userId: 1,
    message: 'Transaction of 2 ROUND_TRIP [SEMARANG - DENPASAR] ' +
    'ticket(s) is success',
    isRead: false,
    deletedAt: null,
    createdAt: '2022-12-16T11:45:25.071Z',
    updatedAt: '2022-12-16T11:45:25.071Z',
  },

  UP_IMAGE: {
    public_id: 'gosky/profiles/1671193627092-153440080',
    url: 'http://res.cloudinary.com/dgjwtquka/image/upload/' +
    'v1671193630/gosky/profiles/1671193627092-153440080.png',
  },

  IMAGE: {
    imageId: '1671193627092-153440080',
    imageUrl: 'http://res.cloudinary.com/dgjwtquka/image/upload/' +
      'v1671193630/gosky/profiles/1671193627092-153440080.png',
  },

  WISHLIST: {
    id: 1,
    userId: 1,
    ticketId: 1,
    deletedAt: null,
    createdAt: '2022-12-16T11:45:25.071Z',
    updatedAt: '2022-12-16T11:45:25.071Z',
  },

  TRANSACTION: {
    id: 1,
    userId: 1,
    ticketId: 1,
    amount: 1,
    bookingCode: 'VQSGU4NRD',
    deletedAt: null,
    createdAt: '2022-12-14T08:09:22.006Z',
    updatedAt: '2022-12-14T08:09:22.006Z',
  },

};

module.exports = mock;
