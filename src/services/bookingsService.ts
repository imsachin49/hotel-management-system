// FS to do test
// import {
//   getAllBookings as getAllBookingsDB,
//   getOneBooking as getOneBookingDB,
//   deleteBooking as deleteBookingDB,
//   createBooking as createBookingDB,
//   updateBooking as updateBookingDB,
// } from "../db/bookingsDb";
// import { BookingType } from "../@types/bookingTypes";

// SQL
// import {
//   getAllBookings as getAllBookingsSql,
//   getBooking as getBookingSql,
//   deleteBooking as deleteBookingSql,
//   createBooking as createBookingSql,
//   updateBooking as updateBookingSql,
// } from "../SQL/bookingsSql";

// MONGO
import {
  getAllBookings as getAllBookingsMongo,
  getBooking as getBookingMongo,
  createBooking as createBookingMongo,
  deleteBooking as deleteBookingMongo,
  updateBooking as updateBookingMongo,
} from "../Mongo/bookingMongo";

import { BookingType } from "../@types/bookingTypes";

export const getAllBookings = async () => {
  // const getAllBookings = await getAllBookingsDB();
  // const getAllBookings = await getAllBookingsSql();
  const getAllBookings = await getAllBookingsMongo();

  return getAllBookings;
};

export const getOneBooking = async (bookingId: string) => {
  // const booking = await getOneBookingDB(bookingId);
  // const booking = await getBookingSql(bookingId);
  const booking = await getBookingMongo(bookingId);

  return booking;
};
export const deleteBooking = async (bookingId: string) => {
  //const deleteBooking = await deleteBookingDB(bookingId);
  // const deleteBooking = await deleteBookingSql(bookingId);
  const deleteBooking = await deleteBookingMongo(bookingId);
  return deleteBooking;
};

export const createBooking = async (newBooking: BookingType) => {
  //const createBooking = await createBookingDB(newBooking);
  // const createBooking = await createBookingSql(newBooking);
  const createBooking = await createBookingMongo(newBooking);
  return createBooking;
};

export const updateBooking = async (
  bookingId: string,
  newBooking: BookingType
) => {
  //const updatedBooking = await updateBookingDB(bookingId, newBooking);
  // const updatedBooking = await updateBookingSql(bookingId, newBooking);
  const updatedBooking = await updateBookingMongo(bookingId, newBooking);
  return updatedBooking;
};
