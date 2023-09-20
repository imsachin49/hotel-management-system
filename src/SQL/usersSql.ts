import { UserType } from "./../@types/userTypes";
import { getSQLDb } from "../utils/sql-conection";

export async function getAllUsers() {
  let connection;
  try {
    connection = await getSQLDb();
    const getAllUsers = await connection.execute("SELECT * FROM users");
    return getAllUsers;
  } catch (err) {
    return err;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export async function getUser(id: string) {
  let connection;
  try {
    connection = await getSQLDb();
    const getUser = await connection.execute(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
    return getUser;
  } catch (err) {
    return err;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export async function createUser(user: UserType) {
  let connection;
  try {
    connection = await getSQLDb();
    const createUser = await connection.execute("INSERT INTO users SET ?", [
      user,
    ]);
    return createUser;
  } catch (err) {
    return err;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export async function deleteUser(id: string) {
  let connection;
  try {
    connection = await getSQLDb();
    const deleteUser = await connection.execute(
      "DELETE FROM users WHERE id = ?",
      [id]
    );
    return deleteUser;
  } catch (err) {
    return err;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export async function updateUser(
  userId: string,
  updates: Omit<Partial<UserType>, "id">
) {
  let connection;
  try {
    connection = await getSQLDb();
    const updateUser = await connection.execute(
      "UPDATE users SET ? WHERE id = ?",
      [updates, userId]
    );
    return updateUser;
  } catch (err) {
    return err;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
