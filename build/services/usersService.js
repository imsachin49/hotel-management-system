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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.createUser = exports.getOneUser = exports.getAllUsers = void 0;
const usersDb_1 = require("../db/usersDb");
const usersSql_1 = require("../SQL/usersSql");
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    //const getAllUsers = await getAllUsersSQL();
    const getAllUsers = yield (0, usersSql_1.getAllUsers)();
    return getAllUsers;
});
exports.getAllUsers = getAllUsers;
const getOneUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, usersDb_1.getOneUser)(userId);
    return user;
});
exports.getOneUser = getOneUser;
const createUser = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    const createdUser = yield (0, usersDb_1.createUser)(newUser);
    return createdUser;
});
exports.createUser = createUser;
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteUser = yield (0, usersDb_1.deleteUser)(userId);
    return deleteUser;
});
exports.deleteUser = deleteUser;
const updateUser = (userId, newUser) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield (0, usersDb_1.updateUser)(userId, newUser);
    return updatedUser;
});
exports.updateUser = updateUser;
