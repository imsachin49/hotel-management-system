import express from "express";
const router = express.Router();
import {
  getAllRooms,
  getOneRoom,
  createRoom,
  deleteRoom,
  updateRoom,
} from "../controllers/roomsController";

router.get("/", getAllRooms);
router.get("/:id", getOneRoom);
router.post("/", createRoom);
router.delete("/:id", deleteRoom);
router.put("/:id", updateRoom);

export default router;
