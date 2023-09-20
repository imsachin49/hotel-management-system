"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.createUser = exports.getOneUser = exports.getAllUsers = void 0;
const users_json_1 = __importDefault(require("../data/users.json"));
const fs_1 = __importDefault(require("fs"));
const getAllUsers = () => {
    console.log("this is the typeof users");
    console.log(typeof users_json_1.default);
    return users_json_1.default;
};
exports.getAllUsers = getAllUsers;
const getOneUser = (userId) => {
    const theUser = users_json_1.default.find((user) => {
        return user.id === userId.replace(/"/g, "") ? true : false;
    });
    return theUser;
};
exports.getOneUser = getOneUser;
const createUser = (newUser) => {
    const currentUsers = JSON.parse(fs_1.default.readFileSync("src/data/users.json", "utf-8"));
    const updatedUsers = [...currentUsers, newUser];
    fs_1.default.writeFileSync("src/data/users.json", JSON.stringify(updatedUsers, null, 2));
    return newUser;
};
exports.createUser = createUser;
const deleteUser = (userId) => {
    const deletedUser = users_json_1.default.filter((user) => {
        return user.id !== userId.replace(/"/g, "");
    });
    if (deletedUser.length === users_json_1.default.length) {
        throw new Error("User not found");
    }
    fs_1.default.writeFileSync("src/data/users.json", JSON.stringify(deletedUser, null, 2));
    return deletedUser;
};
exports.deleteUser = deleteUser;
const updateUser = (userId, updates) => __awaiter(void 0, void 0, void 0, function* () {
    const sanitizedUserId = userId.replace(/"/g, "");
    const updatedUsers = users_json_1.default.map((user) => {
        if (user.id === sanitizedUserId) {
            return Object.assign(Object.assign({}, user), updates);
        }
        else {
            return user;
        }
    });
    const updatedUser = updatedUsers.find((user) => {
        return user.id === sanitizedUserId;
    });
    if (!updatedUser) {
        throw new Error(`User with id ${sanitizedUserId} not found`);
    }
    fs_1.default.writeFileSync("src/data/users.json", JSON.stringify(updatedUsers, null, 2));
    if (updatedUsers.length === 0) {
        throw new Error("No users were updated");
    }
    return updatedUser;
});
exports.updateUser = updateUser;
