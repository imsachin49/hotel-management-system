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
exports.updateBooking = exports.createBooking = exports.deleteBooking = exports.getOneBooking = exports.getAllBookings = void 0;
const bookings_json_1 = __importDefault(require("../data/bookings.json"));
const fs_1 = __importDefault(require("fs"));
const getAllBookings = () => {
    return bookings_json_1.default;
};
exports.getAllBookings = getAllBookings;
const getOneBooking = (bookingId) => {
    const theBooking = bookings_json_1.default.find((booking) => {
        return booking.id === bookingId.replace(/"/g, "");
    });
    return theBooking;
};
exports.getOneBooking = getOneBooking;
const deleteBooking = (bookingId) => {
    const deledteBooking = bookings_json_1.default.filter((booking) => booking.id !== bookingId.replace(/"/g, ""));
    if (deledteBooking.length === bookings_json_1.default.length) {
        throw new Error("Room not found");
    }
    fs_1.default.writeFileSync("src/data/bookings.json", JSON.stringify(deledteBooking, null, 2));
    return deledteBooking;
};
exports.deleteBooking = deleteBooking;
const createBooking = (newBooking) => __awaiter(void 0, void 0, void 0, function* () {
    const currentBookings = JSON.parse(fs_1.default.readFileSync("src/data/bookings.json", "utf-8"));
    const updatedBookings = [...currentBookings, newBooking];
    console.log("this is the new booking  ", newBooking);
    fs_1.default.writeFileSync("src/data/bookings.json", JSON.stringify(updatedBookings, null, 2));
    return newBooking;
});
exports.createBooking = createBooking;
const updateBooking = (bookingId, updates) => __awaiter(void 0, void 0, void 0, function* () {
    const sanatizedBookingId = bookingId.replace(/"/g, "");
    console.log("this is the updatebooking ");
    const updatedBookings = bookings_json_1.default.map((booking) => {
        if (booking.id === sanatizedBookingId) {
            return Object.assign(Object.assign({}, booking), updates);
        }
        else {
            return booking;
        }
    });
    const updatedBooking = updatedBookings.find((booking) => booking.id === sanatizedBookingId);
    if (!updatedBooking) {
        return new Error(`Room with ID "${sanatizedBookingId}" not found`);
    }
    fs_1.default.writeFileSync("src/data/rooms.json", JSON.stringify(updatedBookings, null, 2));
    if (updatedBookings.length === 0) {
        return new Error(`No rooms were updated`);
    }
    return updatedBooking;
});
exports.updateBooking = updateBooking;
