import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

interface Book {
    id: number;
    name: string;
    author: string;
    avail: boolean;
}

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5432")
  });


export function addBook(book: Book) {
  const query = `INSERT INTO books (ID, BOOK, AUTHOR, STATUS) VALUES ($1, $2, $3, $4)`;
  const values = [book.id, book.name, book.author, book.avail];
  return pool.query(query, values);
}

export function issueBook(book: Book) {
  const query = `UPDATE books SET STATUS = FALSE WHERE BOOK = $1`;
  const values = [book.name];
  return pool.query(query, values);
}

export function returnBook(book: Book) {
  const query = `UPDATE books SET STATUS = TRUE WHERE BOOK = $1`;
  const values = [book.name];
  return pool.query(query, values);
}

export function deleteBook(book: Book) {
  const query = `DELETE FROM books WHERE BOOK = $1`;
  const values = [book.name];
  return pool.query(query, values);
}

export function getBooks() {
  return pool.query("SELECT * FROM books");
}