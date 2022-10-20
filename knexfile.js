const dotenv = require('dotenv');
dotenv.config();
// const config = require('config');

module.exports = {

  configuration: {
      client: 'pg',
      version: '7.2',
      connection: {
          host: process.env.DB_HOST,
          port: process.env.DB_PORT,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
      },
      pool: {
          min: 2,
          max: 10,
      },
      migrations: {
          tableName: 'knex_migrations',
      },
  },

};