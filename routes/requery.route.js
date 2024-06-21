import express from "express";
import { requery } from "../controllers/requery.controller.js";
const router = express.Router();

router.route("/requery").post(requery);

export { router };
