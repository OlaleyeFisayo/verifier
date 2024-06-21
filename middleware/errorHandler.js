import CustomAPIError from "../errors/custom-error.js";

export const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(404).json({ msg: "Something went wrong" });
};
