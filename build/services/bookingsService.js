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
exports.updateBooking = exports.createBooking = exports.deleteBooking = exports.getOneBooking = exports.getAllBookings = void 0;
const bookingsDb_1 = require("../db/bookingsDb");
const getAllBookings = () => __awaiter(void 0, void 0, void 0, function* () {
    const getAllBookings = yield (0, bookingsDb_1.getAllBookings)();
    return getAllBookings;
});
exports.getAllBookings = getAllBookings;
const getOneBooking = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield (0, bookingsDb_1.getOneBooking)(bookingId);
    return booking;
});
exports.getOneBooking = getOneBooking;
const deleteBooking = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteBooking = yield (0, bookingsDb_1.deleteBooking)(bookingId);
    return deleteBooking;
});
exports.deleteBooking = deleteBooking;
const createBooking = (newBooking) => __awaiter(void 0, void 0, void 0, function* () {
    const createBooking = yield (0, bookingsDb_1.createBooking)(newBooking);
    return createBooking;
});
exports.createBooking = createBooking;
const updateBooking = (bookingId, newBooking) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBooking = yield (0, bookingsDb_1.updateBooking)(bookingId, newBooking);
    return updatedBooking;
});
exports.updateBooking = updateBooking;
