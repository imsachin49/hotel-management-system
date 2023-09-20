import { commentsCreateSchema } from "./../utils/joi/commentsJoiValidations";
import express from "express";
import { v4 as uuid } from "uuid";
import {
  getAllComments as getAllCommentsService,
  getOneComment as getOneCommentService,
  createComment as createCommentService,
  deleteComment as deleteCommentService,
  updateComment as updateCommentService,
} from "../services/commentsService";

import { validateCommentsParams } from "../utils/commentsValidations";

export const getAllComments = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const getAllComments = await getAllCommentsService();
    return res.send({ status: "Success", data: getAllComments });
  } catch (error) {
    return res.send({ status: "Error", data: error });
  }
};

export const getOneComment = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const comment = await getOneCommentService(req.params.id);
    if (!comment) {
      return res.send({ status: "Error", data: "Comment not found" });
    }
    return res.send({ status: "Success", data: comment });
  } catch (error) {
    return res.send({ status: "Error", data: error });
  }
};

export const createComment = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const newComment = req.body;

    const validateComment = await commentsCreateSchema.validateAsync(
      newComment
    );

    const user = {
      ...validateComment,
      id: uuid(),
      date: newComment.date,
      fullName: newComment.fullName,
      email: newComment.email,
      phone: newComment.phone,
      subject: newComment.subject,
      comment: newComment.comment,
      action: newComment.action,
    };

    const createdUser = await createCommentService(user);
    return res.send({ status: "Success", data: createdUser });
  } catch (error) {
    return res.send({ status: "Error", data: error });
  }
};

export const deleteComment = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const comment = await deleteCommentService(req.params.id);

    return res.send({ status: "Success", data: comment });
  } catch (error) {
    return res.send({ status: "Error", data: error });
  }
};

export const updateComment = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    validateCommentsParams(req.body);
    const updatedComment = await updateCommentService(req.params.id, req.body);
    if (updatedComment instanceof Error) {
      return res.send({ status: "Error", message: updatedComment.message });
    }
    return res.send({ status: "Success", data: updatedComment });
  } catch (error) {
    return res.send({ status: "Comment not found", data: error });
  }
};
