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
exports.createBooking = exports.updateBooking = exports.deleteBooking = exports.getOneBooking = exports.getAllBookings = void 0;
const bookingsService_1 = require("../services/bookingsService");
const uuid_1 = require("uuid");
const bookingsValidations_1 = require("../utils/bookingsValidations");
const getAllBookings = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllBookings = yield (0, bookingsService_1.getAllBookings)();
        return res.send({ status: "Success", data: getAllBookings });
    }
    catch (error) {
        return res.send({ status: "Error", data: error });
    }
});
exports.getAllBookings = getAllBookings;
const getOneBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getOneBooking = yield (0, bookingsService_1.getOneBooking)(req.params.id);
        if (!getOneBooking) {
            return res.send({ status: "Error", data: "Booking not found" });
        }
        return res.send({ status: "Success", data: getOneBooking });
    }
    catch (error) {
        return res.send({ status: "Error", data: error });
    }
});
exports.getOneBooking = getOneBooking;
const deleteBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteBooking = yield (0, bookingsService_1.deleteBooking)(req.params.id);
        if (deleteBooking.length === 0) {
            throw new Error("Booking not found");
        }
        return res.send({ status: "Success", data: deleteBooking });
    }
    catch (error) {
        return res.send({ status: "Error", data: error });
    }
});
exports.deleteBooking = deleteBooking;
const updateBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, bookingsValidations_1.validateBookingParams)(req.body);
        const updateBooking = yield (0, bookingsService_1.updateBooking)(req.params.id, req.body);
        if (updateBooking instanceof Error) {
            return res.send({ status: "Error", message: updateBooking.message });
        }
        return res.send({ status: "Success", data: updateBooking });
    }
    catch (error) {
        return res.send({ status: "Room not found", data: error });
    }
});
exports.updateBooking = updateBooking;
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("this is the create booking try");
        const newBooking = req.body;
        const requiredParams = [
            "fullName",
            "date",
            "checkIn",
            "checkOut",
            "specialRquest",
            "roomType",
            "roomId",
            "status",
        ];
        const missingParams = requiredParams.filter((param) => !req.body.hasOwnProperty(param));
        if (missingParams.length > 0) {
            return res.send({
                status: "Error",
                message: `Missing required parameters: ${missingParams.join(", ")}`,
            });
        }
        if (!(0, bookingsValidations_1.ValidateBookingType)(req.body)) {
            return res.send({
                status: "Error",
                message: "Invalid Booking parameter types",
            });
        }
        const room = Object.assign(Object.assign({}, newBooking), { id: (0, uuid_1.v4)(), bedType: newBooking.bedType, status: newBooking.status, facilites: newBooking.facilites, price: newBooking.price, discount: newBooking.discount, doorNumber: newBooking.doorNumber, floorNumber: newBooking.floorNumber });
        const cretedRoom = yield (0, bookingsService_1.createBooking)(room);
        return res.send({ status: "Success", data: cretedRoom });
    }
    catch (error) {
        return res.send({ status: "Error", data: error });
    }
});
exports.createBooking = createBooking;
