/* eslint-disable no-multi-str */
exports.up = async (knex) => {
    await knex.raw('\
    CREATE TABLE users (\
        "id" serial PRIMARY KEY,\
        "name" VARCHAR( 128 ) NOT NULL,\
        "email" VARCHAR( 128 ) NOT NULL\
    );');
};

exports.down = () => {
};
