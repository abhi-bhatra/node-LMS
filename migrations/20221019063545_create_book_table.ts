exports.up = function(knex, Promise) {
    const createQuery = `CREATE TABLE <examples>(
      id SERIAL PRIMARY KEY NOT NULL,
      message TEXT,
      created_at TIMESTAMP
    )`
    return knex.raw(createQuery)
  }
  
  exports.down = function(knex, Promise) {
    const dropQuery = `DROP TABLE <examples>`
    return knex.raw(dropQuery)
  }