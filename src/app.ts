import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { addBook, issueBook, returnBook, deleteBook, getBooks } from "./queries";
const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get("/", async (req: Request, res: Response) => {
  try {
    const books = await getBooks();
    res.render("home", { data: books.rows });
  } catch (err) {
    console.error(err.message);
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
    try {
      const book = {
        id: parseInt(req.body.id),
        name:  req.body.book,
        author: req.body.author,
        avail: req.body.status
      };
      issueBook(book);
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
});

app.post("/return", (req: Request, res: Response) => {
    try {
      const book = {
        id: parseInt(req.body.id),
        name:  req.body.book,
        author: req.body.author,
        avail: req.body.status
      };
      returnBook(book);
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
});

app.post("/delete", (req: Request, res: Response) => {
    try {
      const book = {
        id: parseInt(req.body.id),
        name:  req.body.book,
        author: req.body.author,
        avail: req.body.status
      };
      deleteBook(book);
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
})
