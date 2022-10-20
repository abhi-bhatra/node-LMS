const dotenv = require('dotenv');
dotenv.config();

const config = require('config');

module.exports = {
  staging: {
    client: 'pg',
    version: '7.2',
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
