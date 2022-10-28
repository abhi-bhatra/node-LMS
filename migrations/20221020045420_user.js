/* eslint-disable no-multi-str */
exports.up = async (knex) => {
    await knex.raw('\
    CREATE TABLE users (\
        "id" serial PRIMARY KEY,\
        "name" VARCHAR( 128 ) NOT NULL,\
        "email" VARCHAR( 128 ) NOT NULL\
        "password" VARCHAR( 128 ) NOT NULL\
    );\
    CREATE TABLE books (\
        "id" serial PRIMARY KEY,\
        "book" VARCHAR( 128 ) NOT NULL,\
        "author" VARCHAR( 128 ) NOT NULL,\
        "status" BOOLEAN NOT NULL\
    );');
};

exports.down = () => {
};
