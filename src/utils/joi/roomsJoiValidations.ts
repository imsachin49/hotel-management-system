import Joi from "joi";
import { RoomType } from "../../@types/roomTypes";

export const roomCreateSchema = Joi.object<RoomType>({
  id: Joi.string(),
  bedType: Joi.string().required().min(4).max(15),
  estatus: Joi.boolean().required(),
  facilities: Joi.array().items(Joi.string()).required(),
  price: Joi.number().required().min(1),
  discount: Joi.number().required().min(0).max(100),
  doorNumber: Joi.number().required().min(1).max(4),
  floorNumber: Joi.number().required().min(1).max(20),
});
