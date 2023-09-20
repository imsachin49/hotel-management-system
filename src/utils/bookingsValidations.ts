import { BookingType } from "../@types/bookingTypes";

export const ValidateBookingType = (data: any): data is BookingType => {
  if (
    typeof data.fullName !== "string" ||
    typeof data.date !== "string" ||
    typeof data.checkIn !== "string" ||
    typeof data.checkOut !== "string" ||
    typeof data.specialRquest !== "string" ||
    typeof data.roomType !== "string" ||
    typeof data.roomId !== "string" ||
    typeof data.status !== "string"
  ) {
    return false;
  }
  return true;
};

export const validateBookingParams = (params: any) => {
  const validParams = [
    "fullName",
    "date",
    "checkIn",
    "checkOut",
    "specialRquest",
    "roomType",
    "roomId",
    "status",
  ];
  const providedParams = Object.keys(params);
  const invalidParams = providedParams.filter(
    (param) => !validParams.includes(param)
  );
  // if (providedParams.length > validParams.length){
  //   return "extra parameters provided";
  // }

  if (invalidParams.length > 0) {
    return `Invalid parameters provided: ${invalidParams.join(", ")}`;
  }

  return true;
};
