import Rooms from "../data/rooms.json";
import { RoomType } from "../@types/roomTypes";
import fs from "fs";

export const getAllRooms = () => {
  return Rooms;
};

export const getOneRoom = (roomId: string) => {
  const theRoom = Rooms.find((room) => {
    return room.id === roomId.replace(/"/g, "") ? true : false;
  });

  return theRoom;
};

export const createRoom = (newRoom: RoomType): RoomType[] => {
  const currentRooms = JSON.parse(
    fs.readFileSync("src/data/rooms.json", "utf-8")
  );
  const updatedRooms = [...currentRooms, newRoom];
  fs.writeFileSync(
    "src/data/rooms.json",
    JSON.stringify(updatedRooms, null, 2)
  );
  return updatedRooms;
};

export const deleteRoom = (roomId: string) => {
  const deletedRoom = Rooms.filter((room) => {
    return room.id !== roomId.replace(/"/g, "");
  });

  if (deletedRoom.length === Rooms.length) {
    throw new Error("Room not found");
  }

  fs.writeFileSync("src/data/rooms.json", JSON.stringify(deletedRoom, null, 2));
  return deletedRoom;
};

export const updateRoom = async (
  roomId: string,
  updates: Partial<RoomType>
) => {
  const sanitizedRoomId = roomId.replace(/"/g, "");

  const updatedRooms = Rooms.map((room) => {
    if (room.id === sanitizedRoomId) {
      return {
        ...room,
        ...updates,
      };
    } else {
      return room;
    }
  });

  const updatedRoom = updatedRooms.find((room) => room.id === sanitizedRoomId);

  if (!updatedRoom) {
    return new Error(`Room with ID "${sanitizedRoomId}" not found`);
  }

  fs.writeFileSync(
    "src/data/rooms.json",
    JSON.stringify(updatedRooms, null, 2)
  );

  if (updatedRooms.length === 0) {
    return new Error(`No rooms were updated`);
  }

  return updatedRooms;
};
