import { BookingType } from "../../../@types/bookingTypes";
import { createRandomBooking } from "../../../SQL/seed/bookingsSeeder";
import { getMongoDb } from "../../mongo-connection";
import { roomModel } from "../roomModel";
import { bookingModel } from "../bookingModel";

const bookingArr: BookingType[] = [];

export async function runBookings() {
  let connection;
  const rooms = await roomModel.find();

  try {
    connection = await getMongoDb();

    for (let i = 0; i < 20; i++) {
      if (rooms[i].id && rooms[i].bedType) {
        const newBooking = createRandomBooking();
        const randomNumber = Math.floor(Math.random() * rooms.length);
        newBooking.roomId = rooms[randomNumber].id;
        newBooking.roomType = rooms[randomNumber].bedType;
        bookingArr.push(newBooking);
      } else {
        throw new Error(`Missing 'id' or 'bedType' for room at index ${i}`);
      }
    }
    const savedBookings = await bookingModel
      .insertMany(bookingArr)
      .then((savedBookin) => {
        console.log("Bookings saved: ", savedBookin);
      })
      .catch((err) => {
        console.log("Error saving Booking: ", err);
      });
    return savedBookings;
  } catch (err) {
    return err;
  } finally {
    connection?.disconnect();
  }
}
