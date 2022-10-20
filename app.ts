import express, { Request, Response } from "express";
import { Pool } from "pg";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import addBook from "./addbook";
dotenv.config();
const app = express();
app.set('view engine', 'ejs');

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432")
});

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get("/", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM books");
    // const books = JSON.stringify(result.rows);
    res.render('home', { data: result.rows });
  } catch (err) {
    console.log(err);
  }
});

app.get("/add", (req: Request, res: Response) => {
  res.render('addbook');
});

// create a route to add book
app.post("/", async (req: Request, res: Response) => {
    try {
      const book = {
        id: parseInt(req.body.id),
        name:  req.body.book,
        author: req.body.author,
        avail: req.body.status
      };
      await addBook(book);
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
});

app.post("/issue", (req: Request, res: Response) => {
  const name = req.body.book;

  pool.query(
    'UPDATE books SET STATUS = FALSE WHERE BOOK = $1',
    [name],
    (err, ) => {
      if (err) {
        console.log(err);
      }
      // console.log(result);
      res.redirect("/");
    }
  );
});

app.post("/return", (req: Request, res: Response) => {
  const name = req.body.book;

  pool.query(
    'UPDATE books SET STATUS = TRUE WHERE BOOK = $1',
    [name],
    (err, ) => {
      if (err) {
        console.log(err);
      }
      // console.log(result);
      res.redirect("/");
    }
  );
});

app.post("/delete", (req: Request, res: Response) => {
  const name = req.body.book;

  pool.query(
    'DELETE FROM books WHERE BOOK = $1',
    [name],
    (err, ) => {
      if (err) {
        console.log(err);
      }
      // console.log(result);
      res.redirect("/");
    }
  );
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
})
