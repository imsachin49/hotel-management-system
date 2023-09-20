import { BookingType } from "../../@types/bookingTypes";
import mongoose from "mongoose";

export const bookingSchema = new mongoose.Schema<BookingType>({
  id: {
    type: String,
    unique: true,
  },
  fullName: {
    type: String,
  },
  bookingDate: {
    type: String,
  },
  checkIn: {
    type: String,
  },
  checkOut: {
    type: String,
  },
  specialRquest: {
    type: String,
  },
  roomType: {
    type: String,
  },
  roomId: {
    type: String,
  },
  status: {
    type: String,
  },
});
export const bookingModel = mongoose.model("Bookings", bookingSchema);
