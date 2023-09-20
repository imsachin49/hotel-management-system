import dotenv from "dotenv";

dotenv.config();

export const SECRETS = {
  jwt: process.env.JWT_SECRET || "",
};
