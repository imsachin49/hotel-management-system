"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser =
  exports.deleteUser =
  exports.createUser =
  exports.getOneUser =
  exports.getAllUsers =
    void 0;
const uuid_1 = require("uuid");
const usersService_1 = require("../services/usersService");
const usersValidations_1 = require("../utils/usersValidations");
const getAllUsers = (_req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const getAllUsers = yield (0, usersService_1.getAllUsers)();
      console.log("this is the response of res");
      console.log(typeof res);
      if (getAllUsers.length === 0) {
        return res.send({ status: "Error", data: "No users" });
      }
      return res.send({ status: 200, data: getAllUsers });
    } catch (error) {
      return res.send({ status: "Error", data: error });
    }
  });
exports.getAllUsers = getAllUsers;
const getOneUser = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const user = yield (0, usersService_1.getOneUser)(req.params.id);
      if (!user) {
        return res.send({ status: "Error", data: "User not found" });
      }
      return res.send({ status: "Success", data: user });
    } catch (error) {
      return res.send({ status: "Error", data: error });
    }
  });
exports.getOneUser = getOneUser;
const createUser = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const newUser = req.body;
      const requiredParams = [
        "fullName",
        "email",
        "joinDate",
        "description",
        "estatus",
        "number",
      ];
      const missingParams = requiredParams.filter(
        (param) => !req.body.hasOwnProperty(param)
      );
      if (missingParams.length > 0) {
        return res.send({
          status: "Error",
          message: `Missing required parameters: ${missingParams.join(", ")}`,
        });
      }
      if (!(0, usersValidations_1.ValidateUserType)(req.body)) {
        return res.send({
          status: "Error",
          message: "Invalid room parameter types",
        });
      }
      const user = Object.assign(Object.assign({}, newUser), {
        id: (0, uuid_1.v4)(),
        fullName: newUser.fullName,
        email: newUser.email,
        joinDate: newUser.joinDate,
        description: newUser.description,
        status: newUser.status,
        number: newUser.number,
      });
      const createdUser = yield (0, usersService_1.createUser)(user);
      return res.send({ status: "Success", data: createdUser });
    } catch (error) {
      return res.send({ status: "Error", data: error });
    }
  });
exports.createUser = createUser;
const deleteUser = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const deletedUser = yield (0, usersService_1.deleteUser)(req.params.id);
      if (exports.deleteUser.length === 0) {
        return res.send({ status: 404, data: "User not found" });
      }
      return res.send({ status: 204, data: deletedUser });
    } catch (error) {
      return res.send({ status: 404, data: "Invalid ID " });
    }
  });
exports.deleteUser = deleteUser;
const updateUser = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      (0, usersValidations_1.validateUserParams)(req.body);
      const updateUser = yield (0, usersService_1.updateUser)(
        req.params.id,
        req.body
      );
      if (updateUser instanceof Error) {
        return res.send({ status: "Error", message: updateUser.message });
      }
      return res.send({ status: "Success", data: updateUser });
    } catch (error) {
      console.log(error);
      return res.send({ status: "User not found", data: error });
    }
  });
exports.updateUser = updateUser;
