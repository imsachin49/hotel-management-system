import { faker } from "@faker-js/faker";
import { UserType } from "../../@types/userTypes";
import { getSQLDb } from "../../utils/sql-conection";
import bcrypt from "bcrypt";

export function createRandomUser(): UserType {
  return {
    id: faker.datatype.uuid(),
    fullName: faker.name.fullName(),
    email: faker.internet.email(),
    joinDate: faker.date.recent().toLocaleDateString(),
    jobTitle: faker.name.jobTitle(),
    estatus: faker.datatype.boolean(),
    number: faker.phone.number("+34-###-###-###"),
    password: bcrypt.hashSync(faker.internet.password(), 10),
  };
}

export async function runUsers() {
  let connection = await getSQLDb();
  try {
    for (let i = 0; i < 20; i++) {
      const newUser = createRandomUser();
      await connection.execute(
        "INSERT INTO users (id, fullname, email, joinDate, jobTitle, estatus, number) VALUES (?,?,?,?,?,?,?)",
        [
          newUser.id,
          newUser.fullName,
          newUser.email,
          newUser.joinDate,
          newUser.jobTitle,
          newUser.estatus,
          newUser.number,
        ]
      );
    }
  } catch (err) {
    console.log(err);
  } finally {
    try {
      connection.end();
    } catch (err) {
      console.log(err);
    } finally {
      try {
        connection.end();
      } catch (err) {
        console.log(err);
      }
    }
  }
}
