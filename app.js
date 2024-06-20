import { config } from "dotenv";
import "express-async-errors";
config();
import express from "express";
import { db } from "./db/db.js";
import { router as requeryRouter } from "./routes/requery.route.js";

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/", requeryRouter);

//Server

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
