import CustomAPIError from "../errors/custom-error.js";
import ipaddr from "ipaddr.js";

const allowedIPs = ["127.0.0.1", "0.0.0.0"];

export const ipFilter = (req, res, next) => {
  let clientIP = req.ip || req.connection.remoteAddress;
  if (ipaddr.isValid(clientIP)) {
    const parsedAddress = ipaddr.parse(clientIP);
    if (parsedAddress.kind() === "ipv6") {
      if (clientIP === "::1") {
        clientIP = "127.0.0.1";
      } else if (parsedAddress.isIPv4MappedAddress()) {
        clientIP = parsedAddress.toIPv4Address().toString();
      }
    }
  }
  if (allowedIPs.includes(clientIP)) {
    next();
  } else {
    throw new CustomAPIError("Access Denied", 403);
  }
};
