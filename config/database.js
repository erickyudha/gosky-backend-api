require('dotenv').config();
const {
  DB_USER = '',
  DB_PASSWORD = '',
  DB_NAME = 'gosky',
  DB_HOST = '127.0.0.1',
  DB_PORT = '5432',
  DB_LOG = false,
} = process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: `${DB_NAME}_development`,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    logging: DB_LOG,
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: `${DB_NAME}_test`,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    logging: DB_LOG,
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: `${DB_NAME}`,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    logging: DB_LOG,
  },
};
