import CryptoJS from "crypto-js";

export function encrypt(text) {
  const key = process.env.ENCRYPTIONKEY;
  const data = CryptoJS.AES.encrypt(text, key);
  return data;
}

export function decrypt(text, key) {
  const original = CryptoJS.AES.decrypt(text, key);
  return original;
}
