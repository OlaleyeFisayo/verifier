import CustomAPIError from "../errors/custom-error.js";
import { RequerySchema } from "../models/requery.model.js";
import { db } from "../db/db.js";
import { separateDateComponents } from "../functions/separateDateComponents.js";

export const requery = async (req, res) => {
  const data = req.body;
  const { value, error } = RequerySchema.validate(data);
  if (error) {
    const message = error.details[0].message;
    throw new CustomAPIError(message, 400);
  }
  const { date, stan, rrn, amount } = value;
  const { year, month, day, hours, minutes, seconds } =
    separateDateComponents(date);
  const [query] = await db.query(
    `SELECT * FROM tms.transaction_record WHERE YEAR(transaction_time)=${year} AND MONTH(transaction_time)=${month} AND DAY(transaction_time)=${day} AND HOUR(transaction_time)=${hours} AND MINUTE(transaction_time)=${minutes} AND SECOND(transaction_time)=${seconds} AND stan=${stan} AND response_amount=${amount} AND retrieval_reference_number=${rrn}`,
  );
  const result = {
    stan: query[0].stan,
    date: query[0].transaction_date,
    rrn: query[0].retrieval_reference_number,
    response_code: query[0].response_code,
    masked_pan: query[0].masked_pan,
    amount: query[0].response_amount,
    terminal_id: query[0].terminal_id,
    emv_data_request: query[0].emv_data_request,
    from_account_identification: query[0].from_account_identification,
  };
  res.send(result);
};
