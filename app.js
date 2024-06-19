import { config } from "dotenv";
import "express-async-errors";
import express from "express";
config();
import { db } from "./db/db.js";

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM tms.transaction_record LIMIT 1");
  res.send(result);
});

//Server

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
