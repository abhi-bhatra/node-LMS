const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./queries')
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'abhinav',
    host: 'localhost',
    database: 'api',
    password: 'abhinav',
    port: 5432,
})
app.set('view engine', 'ejs');

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get("/", (req, res) => {
    pool.query('SELECT * FROM books ORDER BY ID ASC', (error, results) => {
        if (error) {
            throw error
        }
        // console.log(results.rows);
        res.render('home', { data: results.rows });
    })
})

app.get("/add", (req, res) => {
    res.render('addbook');
})

app.post("/", (req, res) => {
    const id = req.body.id;
    const name = req.body.book;
    const author = req.body.author;
    const avail = req.body.status;

    pool.query('INSERT INTO books (ID, BOOK, AUTHOR, STATUS) VALUES ($1, $2, $3, $4)', [id, name, author, avail], (error, results) => {
        if (error) {
            throw error
        }
    res.redirect('/');
    })
})

app.post("/issue", (req, res) => {
    const name = req.body.book;

    pool.query(
        'UPDATE books SET STATUS = FALSE WHERE BOOK = $1',
        [name],
        (error, results) => {
            if (error) {
                throw error
            }
            res.redirect('/');
        }
    )
})

app.post("/return", (req, res) => {
    const requestedBookName = req.body.book;

    pool.query(
        'UPDATE books SET STATUS = TRUE WHERE BOOK = $1',
        [requestedBookName],
        (error, results) => {
            if (error) {
                throw error
            }
            res.redirect('/');
        }
    )
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
