require('ts-node/register');

module.exports = {
  client: 'pg',
  connection: 'postgres://abhinav:abhinav@localhost:5432/api',
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: 'migrations'
  },
  timezone: 'UTC'
};