import joi from "joi";
const { date, number } = joi.types();

export const RequerySchema = joi.object({
  date: date,
  stan: number,
  rrn: number,
  amount: number,
});
