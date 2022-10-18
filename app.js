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
        res.render('home', { data: results.rows });
    })
})
