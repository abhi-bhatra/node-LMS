import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  staging: {
    client: "postgresql",
    connection: {
      database: "api",
      user: "abhinav",
      password: "abhinav"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};

module.exports = config;
