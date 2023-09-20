import { BookingType } from "../@types/bookingTypes";
import { getSQLDb } from "../utils/sql-conection";

//Revisar
export async function getAllBookings() {
  let connection;
  try {
    connection = await getSQLDb();
    const getAllBookings = await connection.execute(`
      SELECT bookings.*, rooms.roomType 
      FROM bookings
      JOIN rooms
      ON bookings.roomId = rooms.id
    `);
    return getAllBookings;
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    throw new Error("Failed to fetch all bookings");
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
export async function getBooking(id: string) {
  let connection;
  try {
    connection = await getSQLDb();
    const getBooking = await connection.execute(
      "SELECT * FROM bookings WHERE id = ?",
      [id]
    );
    return getBooking;
  } catch (err) {
    return err;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

//TODO THIS IS NOT WORKING YET
export async function createBooking(booking: BookingType) {
  let connection;
  try {
    connection = await getSQLDb();
    const createBooking = await connection.execute(
      "INSERT INTO bookings SET ?",
      [booking]
    );
    return createBooking;
  } catch (err) {
    return err;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export async function deleteBooking(id: string) {
  let connection;
  try {
    connection = await getSQLDb();
    const deleteBooking = await connection.execute(
      "DELETE FROM bookings WHERE id = ?",
      [id]
    );
    return deleteBooking;
  } catch (err) {
    return err;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export async function updateBooking(
  bookingId: string,
  updates: Omit<Partial<BookingType>, "id">
) {
  let connection;
  try {
    connection = await getSQLDb();
    const updateBooking = await connection.execute(
      "UPDATE bookings SET ? WHERE id = ?",
      [updates, bookingId]
    );
    return updateBooking;
  } catch (err) {
    return err;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
