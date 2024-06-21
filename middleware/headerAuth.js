import CustomAPIError from "../errors/custom-error.js";

export function headerAuth(req, res, next) {
  const auth = req.headers.authorization;
  const authkey = process.env.AUTHKEY;

  if (auth === authkey) {
    next();
  } else {
    throw new CustomAPIError("Invalid Authorization", 401);
  }
}
