"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRoomParams = exports.ValidateRoomType = void 0;
const ValidateRoomType = (data) => {
    if (typeof data.bedType !== "string" ||
        typeof data.status !== "boolean" ||
        !Array.isArray(data.facilites) ||
        !data.facilites.every((facility) => typeof facility === "string") ||
        typeof data.price !== "number" ||
        typeof data.discount !== "number" ||
        typeof data.doorNumber !== "number" ||
        typeof data.floorNumber !== "number") {
        return false;
    }
    return true;
};
exports.ValidateRoomType = ValidateRoomType;
const validateRoomParams = (params) => {
    const validParams = [
        "bedType",
        "status",
        "facilites",
        "price",
        "discount",
        "doorNumber",
        "floorNumber",
    ];
    const providedParams = Object.keys(params);
    const invalidParams = providedParams.filter((param) => !validParams.includes(param));
    console.log("this is the invalidParams", invalidParams);
    if (invalidParams.length > 0) {
        return `Invalid parameters provided: ${invalidParams.join(", ")}`;
    }
    return true;
};
exports.validateRoomParams = validateRoomParams;
