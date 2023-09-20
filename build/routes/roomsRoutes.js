"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const roomsController_1 = require("../controllers/roomsController");
router.get("/getAllRooms", roomsController_1.getAllRooms);
router.get("/getOneRoom/:id", roomsController_1.getOneRoom);
router.post("/createRoom", roomsController_1.createRoom);
router.delete("/deleteRoom/:id", roomsController_1.deleteRoom);
router.put("/updateRoom/:id", roomsController_1.updateRoom);
exports.default = router;
