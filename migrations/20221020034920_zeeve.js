/* eslint-disable no-multi-str */
exports.up = async (knex) => {
    await knex.raw('CREATE TABLE Books(\
        "id" serial PRIMARY KEY,\
        "book_name" VARCHAR( 50 ),\
        "author" VARCHAR( 50 ),\
        "status" VARCHAR( 254 ) NOT NULL\
    );');
};

exports.down = () => {

};
