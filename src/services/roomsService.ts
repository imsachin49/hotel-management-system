// import {
//   getAllRooms as getAllRoomsDB,
//   getOneRoom as getOneRoomDB,
//   createRoom as createRoomDB,
//   deleteRoom as deleteRoomDB,
//   updateRoom as updateRoomDB,
// } from "../db/roomsDb";

// import {
//   getAllRooms as getAllRoomsSql,
//   getRoom as getRoomSql,
//   createRoom as createRoomSql,
//   deleteRoom as deleteRoomSql,
//   updateRoom as updateRoomSql,
// } from "../SQL/roomSql";

import {
  getAllRooms as getAllRoomsMongo,
  getRoom as getRoomMongo,
  createRoom as createRoomMongo,
  deleteRoom as deleteRoomMongo,
  updateRoom as updateRoomMongo,
} from "../Mongo/roomMongo";

import { RoomType } from "../@types/roomTypes";

export const getAllRooms = async () => {
  //const getAllRooms = await getAllRoomsDB();
  // const getAllRooms = await getAllRoomsSql();
  const getAllRooms = await getAllRoomsMongo();
  return getAllRooms;
};

export const getOneRoom = async (roomId: string) => {
  //const room = await getRoomSql(roomId);
  //  const room = await getOneRoomDB(roomId);
  const room = await getRoomMongo(roomId);
  return room;
};

export const createRoom = async (newRoom: RoomType) => {
  //const createdRoom = await createRoomDB(newRoom);
  //const createdRoom = await createRoomSql(newRoom);
  const createdRoom = await createRoomMongo(newRoom);
  return createdRoom;
};

export const deleteRoom = async (roomId: string) => {
  // const deleteRoom = await deleteRoomDB(roomId);
  //const deleteRoom = await deleteRoomSql(roomId);
  const deleteRoom = await deleteRoomMongo(roomId);
  return deleteRoom;
};

export const updateRoom = async (roomId: string, newRoom: RoomType) => {
  //  const updatedRoom = await updateRoomDB(roomId, newRoom);
  //const updatedRoom = await updateRoomSql(roomId, newRoom);
  const updatedRoom = await updateRoomMongo(roomId, newRoom);

  return updatedRoom;
};
