module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'api',
      host: 'localhost',
      user: 'abhinav',
      password: 'abhinav',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  }
}