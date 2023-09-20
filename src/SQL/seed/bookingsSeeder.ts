import { faker } from "@faker-js/faker";
import { BookingType } from "../../@types/bookingTypes";
import { getSQLDb } from "../../utils/sql-conection";

import { RowDataPacket } from "mysql2";
const bookingStatus = ["inProgress", "Booked", "Canceled"];

interface IRooms extends RowDataPacket {
  id: string;
  bedType: string;
  estatus: boolean;
  facilities: string[];
  price: number;
  discount: number;
  doorNumber: number;
  floorNumber: number;
}

export function createRandomBooking(): BookingType {
  return {
    id: faker.datatype.uuid(),
    fullName: faker.name.fullName(),
    bookingDate: faker.date.recent().toLocaleDateString(),
    checkIn: faker.date.recent().toLocaleDateString(),
    checkOut: faker.date.recent().toLocaleDateString(),
    specialRquest: faker.lorem.sentence(5),
    roomType: "placeholder",
    roomId: "Placeholder",
    status: faker.helpers.arrayElement(bookingStatus),
  };
}

export async function runBookings() {
  let connection = await getSQLDb();
  const res = await connection.execute<IRooms[]>("SELECT * FROM rooms");
  const rooms = res[0];

  try {
    for (let i = 0; i < 20; i++) {
      const newBooking = createRandomBooking();
      const randomNumber = Math.floor(Math.random() * rooms.length);
      newBooking.roomId = rooms[randomNumber].id;
      newBooking.roomType = rooms[randomNumber].bedType;
      await connection.execute(
        "INSERT INTO bookings (id,fullName, bookingDate, checkIn, checkOut, specialRquest, roomType, roomId, status  ) VALUES (?,?,?,?,?,?,?,?,?)",
        [
          newBooking.id,
          newBooking.fullName,
          newBooking.bookingDate,
          newBooking.checkIn,
          newBooking.checkOut,
          newBooking.specialRquest,
          newBooking.roomType,
          newBooking.roomId,
          newBooking.status,
        ]
      );
    }
  } catch (err) {
    console.log(err);
  } finally {
    try {
      connection.end();
    } catch (err) {
      console.log(err);
    }
  }
  console.log("Bookings done!");
}
