import express from "express";
import JWT from "jsonwebtoken";
import { SECRETS } from "../utils/jwtUtils";
import { ValidateUserType } from "../utils/usersValidations";

export const LoginController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const user = req.user;
    console.log(user);
    console.log(ValidateUserType(user));
    if (ValidateUserType(user)) {
      const expiresIn = "365d";
      const token = JWT.sign({ user }, SECRETS.jwt, { expiresIn });
      return res.json({ status: "Success", data: { token, userId: user.id } });
    } else {
      throw new Error("Error getting the userID in the loginController");
    }
  } catch (error) {
    return res.json({ status: "Error", data: error });
  }
};
