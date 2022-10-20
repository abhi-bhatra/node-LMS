/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('books').del()
  await knex('books').insert([
    {id: 1, book: 'Book1', author: 'auth1', status: 'TRUE'},
    {id: 2, book: 'Book2', author: 'auth2', status: 'TRUE'},
    {id: 3, book: 'Book3', author: 'auth3', status: 'FALSE'},
    {id: 4, book: 'Book4', author: 'auth4', status: 'TRUE'},
    {id: 5, book: 'Book5', author: 'auth5', status: 'FALSE'},
    {id: 6, book: 'Book6', author: 'auth6', status: 'TRUE'}
  ]);
  await knex('books').del()
  await knex('users').insert([
    {id: 1, name: 'user1', email: 'user1@example.com'},
    {id: 2, name: 'user2', email: 'user2@example.com'},
    {id: 3, name: 'user3', email: 'user3@example.com'}
  ]);
};
