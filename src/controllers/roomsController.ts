import express from "express";
import {
  getAllRooms as getAllRoomsService,
  getOneRoom as getOneRoomService,
  createRoom as createRoomService,
  deleteRoom as deleteRoomService,
  updateRoom as updateRoomService,
} from "../services/roomsService";
import { v4 as uuid } from "uuid";
import { roomCreateSchema } from "../utils/joi/roomsJoiValidations";
import { validateRoomParams } from "../utils/roomsValidations";

export const getAllRooms = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const getAllRooms = await getAllRoomsService();

    return res.send({ status: "Success", data: getAllRooms });
  } catch (error) {
    return res.send({ status: "Error", data: error });
  }
};

export const getOneRoom = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const room = await getOneRoomService(req.params.id);
    if (!room) {
      return res.send({ status: "Error", data: "Room not found" });
    }
    console.log(room);
    return res.send({ status: "Success", data: room });
  } catch (error) {
    return res.send({ status: "Error", data: error });
  }
};

export const createRoom = async (
  req: express.Request,
  res: express.Response
) => {
  console.log(req.body);
  try {
    const newRoom = req.body;
    const validateRoom = await roomCreateSchema.validateAsync(newRoom);
    console.log("this is the validateRoom", validateRoom);
    const room = {
      ...validateRoom,
      id: uuid(),
    };
    console.log("This is the room", room);
    const cretedRoom = await createRoomService(room);
    console.log("this is the created Room", cretedRoom);
    return res.send({ status: "Success", data: cretedRoom });
  } catch (error) {
    console.log(error);
    return res.send({ status: "Error", data: error });
  }
};

export const deleteRoom = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const deleteRoom = await deleteRoomService(req.params.id);
    return res.send({ status: "Success", data: deleteRoom });
  } catch (error) {
    return res.send({ status: "Room not found", data: error });
  }
};

export const updateRoom = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    validateRoomParams(req.body);
    const updateRoom = await updateRoomService(req.params.id, req.body);
    return res.send({ status: "Success", data: updateRoom });
  } catch (error) {
    return res.send({ status: "Room not found", data: error });
  }
};
