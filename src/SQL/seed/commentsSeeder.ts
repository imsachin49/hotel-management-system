import { faker } from "@faker-js/faker";
import { CommentsType } from "../../@types/commentTypes";
import { getSQLDb } from "../../utils/sql-conection";

export function createRandomComment(): CommentsType {
  return {
    id: faker.datatype.uuid(),
    commentDate: faker.date.recent().toDateString(),
    fullName: faker.name.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number("+34-###-###-###"),
    subject: faker.lorem.sentence(5),
    comment: faker.datatype.boolean(),
    action: faker.datatype.boolean(),
  };
}

export async function runComments() {
  let connection = await getSQLDb();

  try {
    for (let i = 0; i < 20; i++) {
      const newComment = createRandomComment();

      await connection.execute(
        "INSERT INTO comments (id,commentDate, fullName,email,phone,subjet,comment,action) VALUES (?,?,?,?,?,?,?,?)",
        [
          newComment.id,
          newComment.commentDate,
          newComment.fullName,
          newComment.email,
          newComment.phone,
          newComment.subject,
          newComment.comment,
          newComment.action,
        ]
      );
    }
  } catch (error) {
    console.log(error);
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
