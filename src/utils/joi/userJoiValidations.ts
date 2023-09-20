import Joi from "joi";
import { UserType } from "../../@types/userTypes";

export const userCreateSchema = Joi.object<UserType>({
  fullName: Joi.string().required().min(3).max(50),
  email: Joi.string()
    .required()
    .email()
    .pattern(new RegExp("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$")),
  joinDate: Joi.string().isoDate().required(),
  jobTitle: Joi.string().required().min(3).max(50),
  estatus: Joi.boolean().required(),
  number: Joi.string()
    .required()
    .min(8)
    .max(11)
    .pattern(new RegExp("^[0-9]+$")),
  password: Joi.string().required(),
});
