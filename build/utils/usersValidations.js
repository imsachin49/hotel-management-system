"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserParams = exports.ValidateUserType = void 0;
const ValidateUserType = (data) => {
    if (typeof data.fullName !== "string" ||
        typeof data.email !== "string" ||
        typeof data.joinDate !== "string" ||
        typeof data.jobTitle !== "string" ||
        typeof data.status !== "boolean" ||
        typeof data.number !== "string") {
        return false;
    }
    return true;
};
exports.ValidateUserType = ValidateUserType;
const validateUserParams = (params) => {
    const validParams = [
        "fullName",
        "email",
        "joinDate",
        "jobTitle",
        "status",
        "number",
    ];
    const providedParams = Object.keys(params);
    const invalidParams = providedParams.filter((param) => !validParams.includes(param));
    console.log("this is the invalidParams", invalidParams);
    if (invalidParams.length > 0) {
        return `Invalid parameters provided: ${invalidParams.join(", ")}`;
    }
    return true;
};
exports.validateUserParams = validateUserParams;
