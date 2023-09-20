import express from "express";

const router = express.Router();

import {
  getAllBookings,
  getOneBooking,
  deleteBooking,
  createBooking,
  updateBooking,
} from "../controllers/bookingsController";

router.get("/", getAllBookings);
router.get("/:id", getOneBooking);
router.delete("/:id", deleteBooking);
router.post("/", createBooking);
router.put("/:id", updateBooking);

export default router;
