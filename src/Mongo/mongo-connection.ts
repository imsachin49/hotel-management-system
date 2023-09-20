import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const uri = process.env.MONGO_URI ?? "";
export function getMongoDb() {
  return mongoose.connect(uri);
}
export const mongoConnect = async () => {
  try {
    const connection = await getMongoDb();
    console.log("You have been connected to the Mongo DB");
    return connection;
  } catch (err) {
    throw new Error("Unable to connect to Mongo Db");
  }
};
