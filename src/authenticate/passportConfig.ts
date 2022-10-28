import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
});

export function initialize(passport) {
    const authenticateUser = (email, password, done) => {
        pool.query(
            `SELECT * FROM users WHERE email = $1`, [email], (err, results) => {
                if (err) {
                    throw err;
                }
                console.log(results.rows);
                if (results.rows.length > 0) {
                    const user = results.rows[0];
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) {
                            throw err;
                        }
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: "Password is incorrect" });
                        }
                    });
                } else {
                    return done(null, false, { message: "Email is not registered" });
                }
            }
        );
    }
    passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password"
    },
        authenticateUser)
    );

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/google/callback",
        passReqToCallback: true
    },
        function (request, accessToken, refreshToken, profile, done) {
            pool.query(
                `SELECT * FROM users WHERE email = $1`, [profile.email], (err, results) => {
                    if (err) {
                        throw err;
                    }
                    console.log(results.rows);
                    if (results.rows.length > 0) {
                        const user = results.rows[0];
                        return done(null, user);
                    } else {
                        return done(null, false, { message: "Email is not registered" });
                    }
                }
            );
        }
    ));

    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, done) => {
        pool.query(`SELECT * FROM users WHERE id = $1`, [id], (err, results) => {
            if (err) {
                throw err;
            }
            return done(null, results.rows[0]);
        });
    });
}
