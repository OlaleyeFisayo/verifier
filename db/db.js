import mysql from "mysql2";

export const db = mysql
  .createPool({
    host: "127.0.0.1",
    user: "root",
    password: "otd5@livE",
  })
  .promise();
