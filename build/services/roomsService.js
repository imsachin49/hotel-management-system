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
const roomsDb_1 = require("../db/roomsDb");
const getAllRooms = () => __awaiter(void 0, void 0, void 0, function* () {
    const getAllRooms = yield (0, roomsDb_1.getAllRooms)();
    return getAllRooms;
});
exports.getAllRooms = getAllRooms;
const getOneRoom = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield (0, roomsDb_1.getOneRoom)(roomId);
    return room;
});
exports.getOneRoom = getOneRoom;
const createRoom = (newRoom) => __awaiter(void 0, void 0, void 0, function* () {
    const createdRoom = yield (0, roomsDb_1.createRoom)(newRoom);
    return createdRoom;
});
exports.createRoom = createRoom;
const deleteRoom = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteRoom = yield (0, roomsDb_1.deleteRoom)(roomId);
    return deleteRoom;
});
exports.deleteRoom = deleteRoom;
const updateRoom = (roomId, newRoom) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedRoom = yield (0, roomsDb_1.updateRoom)(roomId, newRoom);
    return updatedRoom;
});
exports.updateRoom = updateRoom;
