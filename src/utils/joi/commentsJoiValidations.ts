import Joi from "joi";
import { CommentsType } from "../../@types/commentTypes";

export const commentsCreateSchema = Joi.object<CommentsType>({
  commentDate: Joi.string().isoDate().required(),
  fullName: Joi.string().required().min(3).max(50),
  email: Joi.string()
    .required()
    .email()
    .pattern(new RegExp("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$")),
  phone: Joi.string().required().min(8).max(11).pattern(new RegExp("^[0-9]+$")),
  subject: Joi.string().required().min(3).max(50),
  comment: Joi.boolean().required(),
});
