import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { Pool } from "pg";
import bodyParser from "body-parser";
const app = express();
dotenv.config();
app.set('view engine', 'ejs');

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

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
    // const books = JSON.stringify(result.rows);
    res.render('home', { data: result.rows });
  } catch (err) {
    console.log(err);
  }
});

app.get("/add", (req: Request, res: Response) => {
  res.render('addbook');
});

app.post("/", (req: Request, res: Response) => {
  const id = req.body.id;
  const name =  req.body.book;
  const author = req.body.author;
  const avail = req.body.status;
  console.log(req.body.book);
    try {
      pool.query(
        "INSERT INTO books (ID, BOOK, AUTHOR, STATUS) VALUES ($1, $2, $3, $4)",
        [id, name, author, avail],
        (err, result) => {
          if (err) {
            console.log(err);
          }
          console.log(result);
          res.redirect("/");
        }
      );
    } catch (err) {
      console.log(err);
    }
});

app.post("/issue", (req: Request, res: Response) => {
  const name = req.body.book;

  pool.query(
    'UPDATE books SET STATUS = FALSE WHERE BOOK = $1',
    [name],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      res.redirect("/");
    }
  );
});

app.post("/return", (req: Request, res: Response) => {
  const name = req.body.book;

  pool.query(
    'UPDATE books SET STATUS = TRUE WHERE BOOK = $1',
    [name],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      res.redirect("/");
    }
  );
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
})
