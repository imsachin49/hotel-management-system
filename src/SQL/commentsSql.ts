import { CommentsType } from "../@types/commentTypes";
import { getSQLDb } from "../utils/sql-conection";

export async function getAllComments() {
  let connection;
  try {
    connection = await getSQLDb();
    const getAllComments = await connection.query("SELECT * FROM comments");
    return getAllComments;
  } catch (err) {
    return err;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export async function getComment(id: string) {
  let connection;

  try {
    connection = await getSQLDb();
    const getComment = await connection.execute(
      "SELECT * FROM comments WHERE id = ?",
      [id]
    );
    return getComment;
  } catch (err) {
    return err;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export async function createComment(comment: CommentsType) {
  let connection;
  try {
    connection = await getSQLDb();
    const createComment = await connection.execute(
      "INSERT INTO comments SET ?",
      [comment]
    );
    return createComment;
  } catch (err) {
    return err;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export async function deleteComment(id: string) {
  let connection;
  try {
    connection = await getSQLDb();
    const deleteComment = await connection.execute(
      "DELETE FROM comments WHERE id = ?",
      [id]
    );
    return deleteComment;
  } catch (err) {
    return err;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export async function updateComment(
  commentId: string,
  updates: Omit<Partial<CommentsType>, "id">
) {
  let connection;
  try {
    connection = await getSQLDb();
    const updateComment = await connection.execute(
      "UPDATE comments SET ? WHERE id = ?",
      [updates, commentId]
    );
    return updateComment;
  } catch (err) {
    return err;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
