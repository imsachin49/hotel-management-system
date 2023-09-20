import { RoomType } from "../../../@types/roomTypes";
import { createRandomRoom } from "../../../SQL/seed/roomsSeeder";
import { getMongoDb } from "../../mongo-connection";
import { roomModel } from "../roomModel";

export const roomArr: RoomType[] = [];

export async function runRooms() {
  let connection;
  try {
    connection = await getMongoDb();

    for (let i = 1; i <= 20; i++) {
      roomArr.push(createRandomRoom());
    }

    const savedRooms = await roomModel
      .insertMany(roomArr)
      .then((savedRooms) => {
        console.log("Rooms saved:", savedRooms);
      })
      .catch((error) => {
        console.error("Error saving rooms:", error);
      });

    return savedRooms;
  } catch (err) {
    return err;
  } finally {
    connection?.disconnect();
  }
}
