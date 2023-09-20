import express from "express";
const router = express.Router();
import {
  getAllUsers,
  getOneUser,
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/usersController";

router.get("/", getAllUsers);
router.get("/:id", getOneUser);
router.post("/", createUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

export default router;
