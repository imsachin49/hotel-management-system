"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRoom = exports.deleteRoom = exports.createRoom = exports.getOneRoom = exports.getAllRooms = void 0;
const roomsService_1 = require("../services/roomsService");
const uuid_1 = require("uuid");
const roomsValidations_1 = require("../utils/roomsValidations");
const getAllRooms = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllRooms = yield (0, roomsService_1.getAllRooms)();
        return res.send({ status: "Success", data: getAllRooms });
    }
    catch (error) {
        return res.send({ status: "Error", data: error });
    }
});
exports.getAllRooms = getAllRooms;
const getOneRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const room = yield (0, roomsService_1.getOneRoom)(req.params.id);
        if (!room) {
            return res.send({ status: "Error", data: "Room not found" });
        }
        return res.send({ status: "Success", data: room });
    }
    catch (error) {
        return res.send({ status: "Error", data: error });
    }
});
exports.getOneRoom = getOneRoom;
const createRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRoom = req.body;
        const requiredParams = [
            "bedType",
            "status",
            "facilites",
            "price",
            "discount",
            "doorNumber",
            "floorNumber",
        ];
        const missingParams = requiredParams.filter((param) => !req.body.hasOwnProperty(param));
        if (missingParams.length > 0) {
            return res.send({
                status: "Error",
                message: `Missing required parameters: ${missingParams.join(", ")}`,
            });
        }
        if (!(0, roomsValidations_1.ValidateRoomType)(req.body)) {
            return res.send({
                status: "Error",
                message: "Invalid room parameter types",
            });
        }
        const room = Object.assign(Object.assign({}, newRoom), { id: (0, uuid_1.v4)(), bedType: newRoom.bedType, status: newRoom.status, facilites: newRoom.facilites, price: newRoom.price, discount: newRoom.discount, doorNumber: newRoom.doorNumber, floorNumber: newRoom.floorNumber });
        const cretedRoom = yield (0, roomsService_1.createRoom)(room);
        return res.send({ status: "Success", data: cretedRoom });
    }
    catch (error) {
        return res.send({ status: "Error", data: error });
    }
});
exports.createRoom = createRoom;
const deleteRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteRoom = yield (0, roomsService_1.deleteRoom)(req.params.id);
        if (deleteRoom.length === 0) {
            res.send({ status: "Error", data: "Room not found" });
        }
        console.log(deleteRoom);
        return res.send({ status: "Success", data: deleteRoom });
    }
    catch (error) {
        return res.send({ status: "Room not found", data: error });
    }
});
exports.deleteRoom = deleteRoom;
const updateRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, roomsValidations_1.validateRoomParams)(req.body);
        const updateRoom = yield (0, roomsService_1.updateRoom)(req.params.id, req.body);
        if (updateRoom instanceof Error) {
            return res.send({ status: "Error", message: updateRoom.message });
        }
        return res.send({ status: "Success", data: updateRoom });
    }
    catch (error) {
        return res.send({ status: "Room not found", data: error });
    }
});
exports.updateRoom = updateRoom;
