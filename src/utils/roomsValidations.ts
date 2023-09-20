import { RoomType } from "../@types/roomTypes";
export const ValidateRoomType = (data: any): data is RoomType => {
  if (
    typeof data.bedType !== "string" ||
    typeof data.status !== "boolean" ||
    !Array.isArray(data.facilites) ||
    !data.facilites.every((facility: any) => typeof facility === "string") ||
    typeof data.price !== "number" ||
    typeof data.discount !== "number" ||
    typeof data.doorNumber !== "number" ||
    typeof data.floorNumber !== "number"
  ) {
    return false;
  }
  return true;
};

export const validateRoomParams = (params: any) => {
  const validParams = [
    "bedType",
    "estatus",
    "facilites",
    "price",
    "discount",
    "doorNumber",
    "floorNumber",
  ];

  const providedParams = Object.keys(params);

  const invalidParams = providedParams.filter(
    (param) => !validParams.includes(param)
  );
  if (invalidParams.length > 0) {
    return `Invalid parameters provided: ${invalidParams.join(", ")}`;
  }

  return true;
};
