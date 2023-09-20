import mongoose from "mongoose";
import { UserType } from "../../@types/userTypes";
import { createRandomUser } from "../../SQL/seed/usersSeeder";
import { getMongoDb } from "../mongo-connection";

const userArr: UserType[] = [];

const userSchema = new mongoose.Schema<UserType>({
  id: {
    type: String,
    unique: true,
  },
  fullName: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
  },
  joinDate: {
    type: String,
  },
  jobTitle: {
    type: String,
  },
  estatus: {
    type: Boolean,
  },
  number: {
    type: String,
  },
  password: {
    type: String,
  },
});

export const userModel = mongoose.model("Users", userSchema);

export async function runUsers() {
  let connection;

  try {
    connection = await getMongoDb();

    for (let i = 1; i <= 20; i++) {
      userArr.push(createRandomUser());
      1;
    }

    const saveUsers = await userModel
      .insertMany(userArr)
      .then((savedUser) => {
        console.log(savedUser);
      })
      .catch((err) => {
        console.log(err);
      });
    return saveUsers;
  } catch (err) {
    return err;
  } finally {
    connection?.disconnect();
  }
}
