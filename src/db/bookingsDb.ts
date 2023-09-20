import Bookings from "../data/bookings.json";
import fs from "fs";
import { BookingType } from "../@types/bookingTypes";
export const getAllBookings = () => {
  return Bookings;
};

export const getOneBooking = (bookingId: string) => {
  const theBooking = Bookings.find((booking) => {
    return booking.id === bookingId.replace(/"/g, "");
  });

  return theBooking;
};

export const deleteBooking = (bookingId: string) => {
  const deledteBooking = Bookings.filter(
    (booking) => booking.id !== bookingId.replace(/"/g, "")
  );

  if (deledteBooking.length === Bookings.length) {
    throw new Error("Room not found");
  }

  fs.writeFileSync(
    "src/data/bookings.json",
    JSON.stringify(deledteBooking, null, 2)
  );
  return deledteBooking;
};

export const createBooking = async (newBooking: BookingType) => {
  const currentBookings = JSON.parse(
    fs.readFileSync("src/data/bookings.json", "utf-8")
  );
  const updatedBookings = [...currentBookings, newBooking];

  fs.writeFileSync(
    "src/data/bookings.json",
    JSON.stringify(updatedBookings, null, 2)
  );
  return newBooking;
};

export const updateBooking = async (
  bookingId: string,
  updates: Partial<BookingType>
) => {
  const sanatizedBookingId = bookingId.replace(/"/g, "");
  const updatedBookings = Bookings.map((booking) => {
    if (booking.id === sanatizedBookingId) {
      return {
        ...booking,
        ...updates,
      };
    } else {
      return booking;
    }
  });

  const updatedBooking = updatedBookings.find(
    (booking) => booking.id === sanatizedBookingId
  );

  if (!updatedBooking) {
    return new Error(`Room with ID "${sanatizedBookingId}" not found`);
  }

  fs.writeFileSync(
    "src/data/rooms.json",
    JSON.stringify(updatedBookings, null, 2)
  );

  if (updatedBookings.length === 0) {
    return new Error(`No rooms were updated`);
  }

  return updatedBooking;
};
