import mysql from "mysql2";

const password = process.env.DBPASSWORD;
const user = process.env.DBUSER;

export const db = mysql
  .createConnection({
    host: "127.0.0.1",
    user: 'root',
    password: 'otd5@livE',
  })
  .promise();
