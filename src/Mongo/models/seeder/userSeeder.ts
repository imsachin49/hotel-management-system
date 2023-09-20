import bcrypt from "bcrypt";
import { uuid } from "uuidv4";
import { UserType } from "../../../@types/userTypes";
import { createRandomUser } from "../../../SQL/seed/usersSeeder";
import { getMongoDb } from "../../mongo-connection";
import { userModel } from "../userModel";

const userArr: UserType[] = [];

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
        console.log("User saved", savedUser);
      })
      .catch((err) => {
        console.log("Error saving Users", err);
      });
    return saveUsers;
  } catch (err) {
    return err;
  } finally {
    connection?.disconnect();
  }
}

export async function createMe() {
  let connection;
  try {
    const mario = {
      id: uuid(),
      fullName: "Mario Herrero",
      email: "admin@admin.com",
      joinDate: "17/05/1991",
      jobTitle: "The maker",
      estatus: true,
      number: "+34 123 123 123",
      password: bcrypt.hashSync("password", 10),
    };
    connection = await getMongoDb();
    const savedMario = await userModel.create(mario);
    console.log("Mario has been created");
    return savedMario;
  } catch (err) {
    return err;
  } finally {
    connection?.disconnect();
  }
}
