import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { Pool } from "pg";
const app = express();
dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432")
});

// const connectToDB = async () => {
//   try {
//     await pool.connect();
//   } catch (err) {
//     console.log(err);
//   }
// };
// connectToDB();


app.get("/books", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM books");
    res.json(result.rows);
  } catch (err) {
    console.log(err);
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send("Library Management System");
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
})
