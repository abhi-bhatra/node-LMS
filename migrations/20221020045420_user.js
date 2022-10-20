/* eslint-disable no-multi-str */
exports.up = async (knex) => {
    await knex.raw('\
    CREATE TABLE MultitenantHostings (\
        "id" serial PRIMARY KEY,\
        "name" VARCHAR( 128 ) NOT NULL,\
        "domain" VARCHAR( 128 ) NOT NULL,\
        "ejs_page_relative_path" VARCHAR( 128 ) NOT NULL,\
        "admin_id" INT,\
        "login_default_redirection" VARCHAR( 128 ) NOT NULL,\
        "cookie_valid_domains" json NOT NULL,\
        "oauth_redirection_base_url" VARCHAR( 128 )\
    );');
};

exports.down = () => {

};
