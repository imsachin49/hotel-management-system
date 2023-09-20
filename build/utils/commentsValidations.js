"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCommentsParams = exports.ValidateCommentsType = void 0;
const ValidateCommentsType = (data) => {
    if (typeof data.date !== "string" ||
        typeof data.fullName !== "string" ||
        typeof data.email !== "string" ||
        typeof data.phone !== "string" ||
        typeof data.subject !== "string" ||
        typeof data.comment !== "boolean" ||
        typeof data.action !== "boolean") {
        return false;
    }
    return true;
};
exports.ValidateCommentsType = ValidateCommentsType;
const validateCommentsParams = (params) => {
    const validParams = [
        "date",
        "fullName",
        "email",
        "phone",
        "subject",
        "commment",
        "action",
    ];
    const providedParams = Object.keys(params);
    const invalidParams = providedParams.filter((param) => !validParams.includes(param));
    if (invalidParams.length > 0) {
        return `Invalid parameters provided: ${invalidParams.join(", ")}`;
    }
    return true;
};
exports.validateCommentsParams = validateCommentsParams;
