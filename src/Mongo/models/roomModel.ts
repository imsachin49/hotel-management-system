import mongoose from "mongoose";
import { RoomType } from "../../@types/roomTypes";

export const roomArr: RoomType[] = [];

const roomSchema = new mongoose.Schema<RoomType>({
  id: {
    type: String,
    unique: true,
  },
  bedType: {
    type: String,
    enum: ["single", "double", "double-superior", "suite"],
  },
  estatus: {
    type: Boolean,
  },
  facilities: {
    type: [String],
    enum: [
      "Wifi",
      "TV",
      "Kitchen",
      "Free parking",
      "Air conditioning",
      "Bathtub",
      "Coffee set",
    ],
  },
  price: {
    type: Number,
  },
  discount: {
    type: Number,

    min: 1,
    max: 100,
  },
  doorNumber: {
    type: Number,
    min: 1,
    max: 20,
  },
  floorNumber: {
    type: Number,
    min: 1,
    max: 5,
  },
});

export const roomModel = mongoose.model("Rooms", roomSchema);
