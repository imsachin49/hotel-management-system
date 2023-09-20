import Comments from "../data/comments.json";
import { CommentsType } from "../@types/commentTypes";
import fs from "fs";

export const getAllComments = () => {
  return Comments;
};

export const getOneComment = (commentId: string) => {
  const theComment = Comments.find((comment) => {
    return comment.id === commentId.replace(/"/g, "") ? true : false;
  });
  return theComment;
};

export const createComment = (newComment: CommentsType): CommentsType[] => {
  const currentComments = JSON.parse(
    fs.readFileSync("src/data/comments.json", "utf-8")
  );
  const updatedComments = [...currentComments, newComment];

  fs.writeFileSync(
    "src/data/comments.json",
    JSON.stringify(updatedComments, null, 2)
  );
  return updatedComments;
};

export const deleteComment = (commentId: string) => {
  const deletedComment = Comments.filter((comment) => {
    return comment.id !== commentId.replace(/"/g, "");
  });
  if (deletedComment.length === Comments.length) {
    throw new Error("Comment not found");
  }
  fs.writeFileSync(
    "src/data/comments.json",
    JSON.stringify(deletedComment, null, 2)
  );
  return deletedComment;
};

export const updateComment = async (
  commentId: string,
  updates: Partial<CommentsType>
) => {
  const sanitizedCommentId = commentId.replace(/"/g, "");
  const updatedComments = Comments.map((comment) => {
    if (comment.id === sanitizedCommentId) {
      return {
        ...comment,
        ...updates,
      };
    } else {
      return comment;
    }
  });
  const updatedComment = updatedComments.find((comment) => {
    return comment.id === sanitizedCommentId;
  });
  if (!updatedComment) {
    throw new Error(`Comment with id ${sanitizedCommentId} not found`);
  }
  fs.writeFileSync(
    "src/data/comments.json",
    JSON.stringify(updatedComments, null, 2)
  );
  return updatedComment;
};
