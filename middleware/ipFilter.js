import CustomAPIError from "../errors/custom-error.js";

const allowedIPs = ["127.0.0.1", "0.0.0.0"];

export const ipFilter = (req, res, next) => {
  let clientIP = req.ip || req.connection.remoteAddress;
  if (clientIP === "::1") {
    clientIP = '127.0.0.1';
  }
  if (allowedIPs.includes(clientIP)) {
    next();
  } else {
    throw new CustomAPIError("Access Denied", 403);
  }
};
