import mysql2 from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export function getSQLDb() {
  return mysql2.createConnection(config);
}

export const conectionStatus = async () => {
  try {
    const connection = getSQLDb();
    console.log("You have been connected to the SQL database");
    return connection;
  } catch (err) {
    console.log("failed to connect to the SQL database", err);
    return false;
  }
};
