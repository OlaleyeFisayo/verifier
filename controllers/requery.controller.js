import CustomAPIError from "../errors/custom-error.js";
import { RequerySchema } from "../models/requery.model.js";
import { db } from "../db/db.js";

export const requery = async (req, res) => {
  const data = req.body;
  const { value, error } = RequerySchema.validate(data);
  if (error) {
    const message = error.details[0].message;
    throw new CustomAPIError(message, 400);
  }
  const { date, stan, rrn, amount } = value;
  const query = await db.query("SELECT * FROM tms.transaction_record ORDER BY id DESC LIMIT 1");
  const result = {
    stan: query[0][0].stan,
    date: query[0][0].transaction_date,
    rrn: query[0][0].retrieval_reference_number,
    response_code: query[0][0].response_code,
    masked_pan: query[0][0].masked_pan,
    amount: query[0][0].response_amount,
    terminal_id: query[0][0].terminal_id,
  };
  res.send(result);
};
