import { faker } from "@faker-js/faker";
import { RoomType } from "../../@types/roomTypes";
import { getSQLDb } from "../../utils/sql-conection";

const bedKinds = ["single", "double", "double-superior", "suite"];
const roomFacilities = [
  "Wifi",
  "TV",
  "Kitchen",
  "Free parking",
  "Air conditioning",
  "Bathtub",
  "Coffee set",
];

export function createRandomRoom(): RoomType {
  return {
    id: faker.datatype.uuid(),
    bedType: faker.helpers.arrayElement(bedKinds),
    estatus: faker.datatype.boolean(),
    facilities: faker.helpers.arrayElements(roomFacilities, 3),
    price: faker.datatype.number({
      min: 1,
      max: 1000,
    }),
    discount: faker.datatype.number({
      min: 1,
      max: 100,
    }),
    doorNumber: faker.datatype.number({
      min: 1,
      max: 20,
    }),
    floorNumber: faker.datatype.number({
      min: 1,
      max: 5,
    }),
  };
}

export async function runRooms() {
  let connection = await getSQLDb();

  try {
    for (let i = 0; i < 20; i++) {
      const newRoom = createRandomRoom();

      await connection.execute(
        "INSERT INTO rooms (id, bedType, estatus,facilities, price, discount, doorNumber, floorNumber ) VALUES (?,?,?,?,?,?,?,?) ",
        [
          newRoom.id,
          newRoom.bedType,
          newRoom.estatus,
          newRoom.facilities,
          newRoom.price,
          newRoom.discount,
          newRoom.doorNumber,
          newRoom.floorNumber,
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
}
