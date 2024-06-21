import { config } from "dotenv";
config();
import "express-async-errors";
import express from "express";
import { router as requeryRouter } from "./routes/requery.route.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { ipFilter } from "./middleware/ipFilter.js";

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use(ipFilter);
app.use(requeryRouter);
app.use(notFound);
app.use(errorHandler);

//Server

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
