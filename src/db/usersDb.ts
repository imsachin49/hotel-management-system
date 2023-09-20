import Users from "../data/users.json";
import { UserType } from "../@types/userTypes";
import fs from "fs";

export const getAllUsers = () => {
  return Users;
};

export const getOneUser = (userId: string) => {
  const theUser = Users.find((user) => {
    return user.id === userId.replace(/"/g, "") ? true : false;
  });
  return theUser;
};

export const createUser = (newUser: UserType): UserType => {
  const currentUsers = JSON.parse(
    fs.readFileSync("src/data/users.json", "utf-8")
  );
  const updatedUsers = [...currentUsers, newUser];
  fs.writeFileSync(
    "src/data/users.json",
    JSON.stringify(updatedUsers, null, 2)
  );
  return newUser;
};

export const deleteUser = (userId: string) => {
  const deletedUser = Users.filter((user) => {
    return user.id !== userId.replace(/"/g, "");
  });
  if (deletedUser.length === Users.length) {
    throw new Error("User not found");
  }
  fs.writeFileSync("src/data/users.json", JSON.stringify(deletedUser, null, 2));
  return deletedUser;
};
export const updateUser = async (
  userId: string,
  updates: Partial<UserType>
) => {
  const sanitizedUserId = userId.replace(/"/g, "");

  const updatedUsers = Users.map((user) => {
    if (user.id === sanitizedUserId) {
      return {
        ...user,
        ...updates,
      };
    } else {
      return user;
    }
  });

  const updatedUser = updatedUsers.find((user) => {
    return user.id === sanitizedUserId;
  });

  if (!updatedUser) {
    throw new Error(`User with id ${sanitizedUserId} not found`);
  }

  fs.writeFileSync(
    "src/data/users.json",
    JSON.stringify(updatedUsers, null, 2)
  );

  if (updatedUsers.length === 0) {
    throw new Error("No users were updated");
  }

  return updatedUser;
};
