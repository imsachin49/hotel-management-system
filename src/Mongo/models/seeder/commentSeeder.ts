import { createRandomComment } from "../../../SQL/seed/commentsSeeder";
import { getMongoDb } from "../../mongo-connection";
import { CommentsType } from "../../../@types/commentTypes";
import { commentModel } from "../commentModel";

const commentArr: CommentsType[] = [];

export async function runComments() {
  let connection;
  try {
    connection = await getMongoDb();

    for (let i = 1; i <= 20; i++) {
      commentArr.push(createRandomComment());
    }
    const savedComments = await commentModel
      .insertMany(commentArr)
      .then((savedComment) => {
        console.log("Comment saved", savedComment);
      })
      .catch((error) => {
        console.error("Error saving Comments:", error);
      });
    return savedComments;
  } catch (err) {
    return err;
  } finally {
    connection?.disconnect();
  }
}
