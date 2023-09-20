import { BookingType } from "../@types/bookingTypes";
import { bookingModel } from "./models/bookingModel";

export async function getAllBookings() {
  try {
    const getAllBookings = await bookingModel.find();
    return getAllBookings;
  } catch (err) {
    return err;
  }
}

export async function getBooking(id: string) {
  try {
    const getBooking = await bookingModel.find({ id: id });
    return getBooking[0];
  } catch (err) {
    return err;
  }
}

export async function createBooking(booking: BookingType) {
  try {
    const createBooking = await bookingModel.create(booking);
    return createBooking;
  } catch (err) {
    return err;
  }
}

export async function updateBooking(
  userId: string,
  updates: Omit<Partial<BookingType>, "id">
) {
  try {
    const updateBooking = await bookingModel.findOneAndUpdate(
      { id: userId },
      updates,
      {
        new: true,
      }
    );
    return updateBooking;
  } catch (err) {
    return err;
  }
}

export async function deleteBooking(id: string) {
  try {
    const deleteBooking = await bookingModel.deleteOne({ id: id });
    return deleteBooking;
  } catch (err) {
    return err;
  }
}
