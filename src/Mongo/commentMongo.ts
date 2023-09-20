import { CommentsType } from "../@types/commentTypes";
import { commentModel } from "./models/commentModel";

export async function getAllComments() {
  try {
    const getAllComments = await commentModel.find();
    return getAllComments;
  } catch (err) {
    return err;
  }
}

export async function getComment(id: string) {
  try {
    const getComment = await commentModel.findById(id);
    return getComment;
  } catch (err) {
    return err;
  }
}

export async function createComment(user: CommentsType) {
  try {
    const createComment = await commentModel.create(user);
    return createComment;
  } catch (err) {
    return err;
  }
}

export async function updateComment(
  userId: string,
  updates: Omit<Partial<CommentsType>, "id">
) {
  try {
    const updateComment = await commentModel.findOneAndUpdate(
      { id: userId },
      updates,
      {
        new: true,
      }
    );
    return updateComment;
  } catch (err) {
    return err;
  }
}

export async function deleteComment(id: string) {
  try {
    const deleteComment = await commentModel.deleteOne({ id: id });
    return deleteComment;
  } catch (err) {
    return err;
  }
}
