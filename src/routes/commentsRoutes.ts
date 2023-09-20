import express from "express";
const router = express.Router();
import {
  getAllComments,
  getOneComment,
  createComment,
  deleteComment,
  updateComment,
} from "../controllers/commentsController";

router.get("/", getAllComments);
router.get("/:id", getOneComment);
router.post("/", createComment);
router.delete("/:id", deleteComment);
router.put("/:id", updateComment);

export default router;
