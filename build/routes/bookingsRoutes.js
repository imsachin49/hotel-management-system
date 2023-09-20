"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const bookingsController_1 = require("../controllers/bookingsController");
router.get("/getAllBookings", bookingsController_1.getAllBookings);
router.get("/getOneBooking/:id", bookingsController_1.getOneBooking);
router.delete("/deleteBooking/:id", bookingsController_1.deleteBooking);
router.post("/createBooking", bookingsController_1.createBooking);
router.put("/updateBooking/:id", bookingsController_1.updateBooking);
exports.default = router;
