/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('books').del()
  await knex('books').insert([
    {id: 1, Book: 'Book1', Author: 'auth1', Status: 'TRUE'},
    {id: 2, Book: 'Book2', Author: 'auth2', Status: 'TRUE'},
    {id: 3, Book: 'Book3', Author: 'auth3', Status: 'FALSE'},
    {id: 4, Book: 'Book4', Author: 'auth4', Status: 'TRUE'},
    {id: 5, Book: 'Book5', Author: 'auth5', Status: 'FALSE'},
    {id: 6, Book: 'Book6', Author: 'auth6', Status: 'TRUE'}
  ]);
  await knex('books').del()
  await knex('users').insert([
    {id: 1, name: 'user1', email: 'user1@example.com'},
    {id: 2, name: 'user2', email: 'user2@example.com'},
    {id: 3, name: 'user3', email: 'user3@example.com'}
  ]);
};
