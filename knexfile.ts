import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  staging: {
    client: "pg",
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
      tableName: "api"
    }
  }
};

module.exports = config;
