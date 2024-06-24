import joi from "joi";
const { string } = joi.types();

export const RequerySchema = joi.object({
  // date: date,
  // stan: number,
  rrn: string,
  // amount: number,
});

export const DecryptSchema = joi.object({
  emv: string,
  key: string,
});
