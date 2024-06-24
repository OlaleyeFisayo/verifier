import CustomAPIError from "../errors/custom-error.js";
import { DecryptSchema, RequerySchema } from "../models/requery.model.js";
import { db } from "../db/db.js";
import { decrypt, encrypt } from "../functions/encoding.js";

export const requery = async (req, res) => {
  const data = req.body;
  const { value, error } = RequerySchema.validate(data);
  if (error) {
    const message = error.details[0].message;
    throw new CustomAPIError(message, 400);
  }

  const [query] = await db.query(
    `SELECT stan, transaction_date, retrieval_reference_number, response_code, masked_pan, response_amount, terminal_id, emv_data_request, from_account_identification FROM tms.transaction_record WHERE retrieval_reference_number='${value.rrn}'`,
  );

  const queryObject = query[0];
  const encrytedEmv = encrypt(queryObject.emv_data_request);
  const result = {
    stan: queryObject.stan,
    transaction_date: queryObject.transaction_date,
    retrieval_reference_number: queryObject.retrieval_reference_number,
    response_code: queryObject.response_code,
    masked_pan: queryObject.masked_pan,
    response_amount: queryObject.response_amount,
    terminal_id: queryObject.terminal_id,
    emv_data_request: encrytedEmv,
    from_account_identification: queryObject.from_account_identification,
  };
  res.status(200).json(result);
};

export const decryptEmv = async (req, res) => {
  const data = req.body;
  const { value, error } = DecryptSchema.validate(data);
  if (error) {
    const message = error.details[0].message;
    throw new CustomAPIError(message, 400);
  }
  const { emv, key } = value;
  const original = decrypt(emv, key);
  res.status(200).json({ emv: original });
};
