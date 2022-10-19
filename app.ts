import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { Pool } from "pg";
const app = express();
dotenv.config();
app.set('view engine', 'ejs');

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432")
});

app.get("/", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM books");
    // Convert result.rows in JSON
    const books = JSON.stringify(result.rows);
    res.render('home', {data: books});
  } catch (err) {
    console.log(err);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
})
