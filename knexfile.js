const dotenv = require('dotenv');
dotenv.config();

const config = require('config');

module.exports = {
  client: 'pg',
  version: '7.2',
  connection: {
    database: config.get('db.database'),
    user: config.get('db.user'),
    password: config.get('db.password'),
    host: config.get('db.host'),
    port: config.get('db.port'),
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};