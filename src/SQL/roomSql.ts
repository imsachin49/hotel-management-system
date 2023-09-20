import { RoomType } from "./../@types/roomTypes";

import { getSQLDb } from "../utils/sql-conection";

export async function getAllRooms() {
  let connection;
  try {
    connection = await getSQLDb();
    const getAllRooms = await connection.execute("SELECT * FROM rooms");
    return getAllRooms;
  } catch (err) {
    return err;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export async function getRoom(id: string) {
  let connection;
  try {
    connection = await getSQLDb();
    const getRoom = await connection.execute(
      "SELECT * FROM rooms WHERE id = ?",
      [id]
    );
    return getRoom;
  } catch (err) {
    return err;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export async function createRoom(room: RoomType) {
  let connection;
  try {
    connection = await getSQLDb();
    const createRoom = await connection.execute("INSERT INTO rooms SET ?", [
      room,
    ]);
    return createRoom;
  } catch (err) {
    return err;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export async function deleteRoom(id: string) {
  let connection;
  try {
    connection = await getSQLDb();
    const deleteRoom = await connection.execute(
      "DELETE FROM rooms WHERE id = ?",
      [id]
    );
    return deleteRoom;
  } catch (err) {
    return err;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export async function updateRoom(
  roomId: string,
  updates: Omit<Partial<RoomType>, "id">
) {
  let connection;
  try {
    connection = await getSQLDb();
    const updateRoom = await connection.execute(
      "UPDATE rooms SET ? WHERE id = ?",
      [updates, roomId]
    );
    return updateRoom;
  } catch (err) {
    return err;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
