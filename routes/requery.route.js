import express from "express";
import { decryptEmv, requery } from "../controllers/requery.controller.js";
const router = express.Router();

router.route("/requery").post(requery);
router.route("/decryptEmv").post(decryptEmv);

export { router };
