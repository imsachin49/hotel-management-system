import { RoomType } from "../@types/roomTypes";
import { roomModel } from "./models/roomModel";

export async function getAllRooms() {
  try {
    const getAllRooms = await roomModel.find();
    return getAllRooms;
  } catch (err) {
    return err;
  }
}

//check if findByid works if not findOne
export async function getRoom(id: string) {
  try {
    const getRoom = await roomModel.find({ id: id });
    return getRoom[0];
  } catch (err) {
    return err;
  }
}

export async function createRoom(room: RoomType) {
  try {
    const createRoom = await roomModel.create(room);
    return createRoom;
  } catch (err) {
    return err;
  }
}

export async function deleteRoom(id: string) {
  try {
    const deleteRoom = await roomModel.deleteOne({ id: id });
    return deleteRoom;
  } catch (err) {
    return err;
  }
}

export async function updateRoom(
  roomId: string,
  updates: Omit<Partial<RoomType>, "id">
) {
  try {
    const updateRoom = await roomModel.findOneAndUpdate(
      { id: roomId },
      updates,
      {
        new: true,
      }
    );
    return updateRoom;
  } catch (err) {
    return err;
  }
}
