import Joi from "joi";
import { BookingType } from "../../@types/bookingTypes";

export const bookingCreateSchema = Joi.object<BookingType>({
  id: Joi.string(),
  fullName: Joi.string().required().min(3).max(50),
  bookingDate: Joi.string().isoDate().required(),
  checkIn: Joi.string().isoDate().required(),
  checkOut: Joi.string().isoDate().required(),
  specialRquest: Joi.string(),
  roomType: Joi.string().required().min(3).max(50),
  roomId: Joi.string().required(),
  status: Joi.string().required(),
});
