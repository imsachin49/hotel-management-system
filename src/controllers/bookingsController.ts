import { bookingCreateSchema } from "./../utils/joi/bookingsJoiValidations";
import express from "express";
import {
  getAllBookings as getAllBookingsService,
  getOneBooking as getOneBookingService,
  deleteBooking as deleteBookingService,
  updateBooking as updateBookingService,
  createBooking as createBookingService,
} from "../services/bookingsService";

import { v4 as uuid } from "uuid";
import { validateBookingParams } from "../utils/bookingsValidations";

export const getAllBookings = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const getAllBookings = await getAllBookingsService();
    return res.send({ status: "Success", data: getAllBookings });
  } catch (error) {
    return res.send({ status: "Error", data: error });
  }
};

export const getOneBooking = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const getOneBooking = await getOneBookingService(req.params.id);
    if (!getOneBooking) {
      return res.send({ status: "Error", data: "Booking not found" });
    }

    return res.send({ status: "Success", data: getOneBooking });
  } catch (error) {
    return res.send({ status: "Error", data: error });
  }
};

export const deleteBooking = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const deleteBooking = await deleteBookingService(req.params.id);
    return res.send({ status: "Success", data: deleteBooking });
  } catch (error) {
    return res.send({ status: "Error", data: error });
  }
};

export const updateBooking = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    validateBookingParams(req.body);

    const updateBooking = await updateBookingService(req.params.id, req.body);

    if (updateBooking instanceof Error) {
      return res.send({ status: "Error", message: updateBooking.message });
    }

    return res.send({ status: "Success", data: updateBooking });
  } catch (error) {
    return res.send({ status: "Room not found", data: error });
  }
};

export const createBooking = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const newBooking = req.body;

    const validatedBooking = await bookingCreateSchema.validateAsync(
      newBooking
    );

    const booking = {
      ...validatedBooking,
      id: uuid(),
    };
    const createdBooking = await createBookingService(booking);
    console.log("this is the createdBooking", createdBooking);
    return res.send({ status: "Success", data: createdBooking });
  } catch (error) {
    return res.send({ status: "Error", data: error });
  }
};
