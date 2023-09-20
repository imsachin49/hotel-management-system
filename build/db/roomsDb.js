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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRoom = exports.deleteRoom = exports.createRoom = exports.getOneRoom = exports.getAllRooms = void 0;
const rooms_json_1 = __importDefault(require("../data/rooms.json"));
const fs_1 = __importDefault(require("fs"));
const getAllRooms = () => {
    return rooms_json_1.default;
};
exports.getAllRooms = getAllRooms;
const getOneRoom = (roomId) => {
    const theRoom = rooms_json_1.default.find((room) => {
        return room.id === roomId.replace(/"/g, "") ? true : false;
    });
    console.log(theRoom);
    return theRoom;
};
exports.getOneRoom = getOneRoom;
const createRoom = (newRoom) => {
    const currentRooms = JSON.parse(fs_1.default.readFileSync("src/data/rooms.json", "utf-8"));
    const updatedRooms = [...currentRooms, newRoom];
    fs_1.default.writeFileSync("src/data/rooms.json", JSON.stringify(updatedRooms, null, 2));
    return updatedRooms;
};
exports.createRoom = createRoom;
const deleteRoom = (roomId) => {
    const deletedRoom = rooms_json_1.default.filter((room) => {
        console.log("this is the roomID", roomId);
        console.log("this is the room iD", room.id);
        return room.id !== roomId.replace(/"/g, "");
    });
    if (deletedRoom.length === rooms_json_1.default.length) {
        throw new Error("Room not found");
    }
    fs_1.default.writeFileSync("src/data/rooms.json", JSON.stringify(deletedRoom, null, 2));
    console.log("this is the deletedRoom", deletedRoom);
    return deletedRoom;
};
exports.deleteRoom = deleteRoom;
const updateRoom = (roomId, updates) => __awaiter(void 0, void 0, void 0, function* () {
    const sanitizedRoomId = roomId.replace(/"/g, "");
    const updatedRooms = rooms_json_1.default.map((room) => {
        if (room.id === sanitizedRoomId) {
            return Object.assign(Object.assign({}, room), updates);
        }
        else {
            return room;
        }
    });
    const updatedRoom = updatedRooms.find((room) => room.id === sanitizedRoomId);
    if (!updatedRoom) {
        return new Error(`Room with ID "${sanitizedRoomId}" not found`);
    }
    fs_1.default.writeFileSync("src/data/rooms.json", JSON.stringify(updatedRooms, null, 2));
    if (updatedRooms.length === 0) {
        return new Error(`No rooms were updated`);
    }
    return updatedRooms;
});
exports.updateRoom = updateRoom;
