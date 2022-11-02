import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

const LocalStrategy = require('passport-local').Strategy;

dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432', 10),
});

function initialize(passport: any): any {
    const authenticateUser = (email, password, done) => {
        pool.query(
            'SELECT * FROM users WHERE email = $1', [email], (err, results) => {
                if (err) {
                    throw err;
                }
                console.log(results.rows);
                if (results.rows.length > 0) {
                    const user = results.rows[0];
                    bcrypt.compare(password, user.password, (error, isMatch) => {
                        if (error) {
                            throw error;
                        }
                        if (isMatch) {
                            return done(null, user);
                        }
                        return done(null, false, { message: 'Password is incorrect' });
                    });
                } else {
                    return done(null, false, { message: 'Email is not registered' });
                }
                return null;
            },
        );
    };
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },
    authenticateUser));

    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, done) => {
        pool.query('SELECT * FROM users WHERE id = $1', [id], (err, results) => {
            if (err) {
                throw err;
            }
            return done(null, results.rows[0]);
        });
    });
}

export default initialize;
