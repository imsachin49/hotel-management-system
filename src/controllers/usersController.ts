import bcrypt from "bcrypt";
import express from "express";
import { v4 as uuid } from "uuid";
import {
  getAllUsers as getAllUsersService,
  getOneUser as getOneUserService,
  createUser as createUserService,
  deleteUser as deleteUserService,
  updateUser as updateUserService,
} from "../services/usersService";
import { validateUserParams } from "../utils/usersValidations";
import { userCreateSchema } from "../utils/joi/userJoiValidations";

export const getAllUsers = async (
  _req: express.Request,
  res: express.Response
) => {
  try {
    const allUsers = await getAllUsersService();
    return res.send({ status: "OK", data: allUsers });
  } catch (error) {
    return res.send({ status: "Error", data: error });
  }
};

export const getOneUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const user = await getOneUserService(req.params.id);
    if (!user) {
      return res.send({ status: "Error", data: "User not found" });
    }
    return res.send({ status: "Success", data: user });
  } catch (error) {
    return res.send({ status: "Error", data: error });
  }
};

export const createUser = async (
  req: express.Request,
  res: express.Response
) => {
  console.log("This is the new user", req.body);
  try {
    const newUser = req.body;
    console.log("This is the new user", newUser);
    const validateUser = await userCreateSchema.validateAsync(newUser);

    const user = {
      ...validateUser,
      id: uuid(),
      fullName: newUser.fullName,
      email: newUser.email,
      joinDate: newUser.joinDate,
      description: newUser.description,
      estatus: newUser.estatus,
      number: newUser.number,
      password: bcrypt.hashSync(newUser.password, 10),
    };

    const createdUser = await createUserService(user);

    return res.send({ status: "Success", data: createdUser });
  } catch (error) {
    console.log("estamos entrando al catch", error);
    return res.send({ status: "Error", data: error });
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const deletedUser = await deleteUserService(req.params.id);
    if (deleteUser.length === 0) {
      return res.send({ status: 404, data: "User not found" });
    }
    return res.send({ status: 204, data: deletedUser });
  } catch (error) {
    return res.send({ status: 404, data: "Invalid ID " });
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    validateUserParams(req.body);
    const updateUser = await updateUserService(req.params.id, req.body);
    if (updateUser instanceof Error) {
      return res.send({ status: "Error", message: updateUser.message });
    }
    return res.send({ status: "Success", data: updateUser });
  } catch (error) {
    return res.send({ status: "User not found", data: error });
  }
};
