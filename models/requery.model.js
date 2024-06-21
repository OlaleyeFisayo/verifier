import joi from "joi";
const { date, number, string } = joi.types();

export const RequerySchema = joi.object({
  date: date,
  stan: number,
  rrn: number,
  amount: number,
});

export const DecryptSchema = joi.object({
  emv: string,
  key: string,
});
