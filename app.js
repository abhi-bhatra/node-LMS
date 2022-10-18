const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./queries')
app.set('view engine', 'ejs');

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get("/", (req, res) => {
    console.log(db.getUsers);
    res.render("home", { data: db.getBooks })
})

app.listen(3000, (req, res) => {
    console.log("App is running on port 3000")
})