import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import session from 'express-session';
import flash from 'express-flash';
import {
    addBook, issueBook, returnBook, deleteBook, getBooks,
} from './queries';
import { initialize } from './authenticate/passportConfig';

initialize(passport);
dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
});

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

function checkAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        next();
    }
    return res.redirect('/');
}

function checkNotAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/users/login');
    }
    return next();
}

app.get('/', checkNotAuthenticated, async (req: Request, res: Response) => {
    try {
        const books = await getBooks();
        res.render('home', { data: books.rows });
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/users/register', checkAuthenticated, (req: Request, res: Response) => {
    res.render('register');
});

app.get('/users/login', checkAuthenticated, (req: Request, res: Response) => {
    res.render('login');
});

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/users/login',
    successRedirect: '/',
    failureFlash: true,
}));

app.post('/users/register', async (req: Request, res: Response) => {
    const {
        name, email, password, password2,
    } = req.body;
    // console.log(name, email, password, password2);
    const errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all the fields' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password should be atleast 6 characters long' });
    }

    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (errors.length > 0) {
        res.render('register', { errors });
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        pool.query(
            `SELECT * FROM users
        WHERE email = $1`,
            [email],
            (err, results) => {
                if (err) {
                    throw err;
                }
                console.log(results.rows);
                if (results.rows.length > 0) {
                    errors.push({ msg: 'Email already registered' });
                    res.render('register', { errors });
                } else {
                    pool.query(
                        `INSERT INTO users (name, email, password)
                        VALUES ($1, $2, $3)
                        RETURNING id, password`,
                        [name, email, hashedPassword],
                        (err, results) => {
                            if (err) {
                throw err;
              }
              console.log(results.rows);
              req.flash('success_msg', 'You are now registered and can log in');
              res.redirect('/users/login');
            }
          )
        }
      }
    );
  }
});

app.post('/users/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}));

app.get('/users/logout', (req: Request, res: Response) => {
  req.logout(function (err) {
    if (err) {
      throw err;
    }
    req.flash('success_msg', 'You have logged out');
    res.redirect('/users/login');
  })
});

app.get("/add", (req: Request, res: Response) => {
  res.render('addbook');
});

// create a route to add book
app.post('/', async (req: Request, res: Response) => {
  try {
    const book = {
      id: parseInt(req.body.id),
      name: req.body.book,
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
      name: req.body.book,
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
            name: req.body.book,
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
      name: req.body.book,
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
