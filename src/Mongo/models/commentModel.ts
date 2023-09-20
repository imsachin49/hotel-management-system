import mongoose from "mongoose";
import { CommentsType } from "../../@types/commentTypes";

const commentSchema = new mongoose.Schema<CommentsType>({
  id: {
    type: String,
    unique: true,
  },
  commentDate: {
    type: String,
  },
  fullName: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  subject: {
    type: String,
  },
  comment: {
    type: Boolean,
  },
  action: {
    type: Boolean,
  },
});
export const commentModel = mongoose.model("Comments", commentSchema);
