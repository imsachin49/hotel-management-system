//import {
// getAllUsers as getAllUsersDB,
// getOneUser as getOneUserDB,
//createUser as createUserDB,
//deleteUser as deleteUserDB,
// updateUser as updateUserDB,
//} from "../db/usersDb";

// import {
//   getAllUsers as getAllUsersSQL,
//   getUser as getUserSQL,
//   createUser as createUserSQL,
//   deleteUser as deleteUserSQL,
//   updateUser as updateUserSQL,
// } from "../SQL/usersSql";

import {
  getAllUsers as getAllUsersMongo,
  getUser as getUserMongo,
  createUser as createUserMongo,
  deleteUser as deleteUserMongo,
  updateUser as upadteUserMongo,
} from "../Mongo/userMongo";

import { UserType } from "../@types/userTypes";

export const getAllUsers = async () => {
  //const getAllUsers = await getAllUsersSQL();
  // const getAllUsers = await getAllUsersSQL();
  const getAllUsers = await getAllUsersMongo();
  return getAllUsers;
};

export const getOneUser = async (id: string) => {
  // const user = await getOneUserDB(userId);
  // const user = await getUserSQL(id);
  const user = await getUserMongo(id);

  return user;
};

export const createUser = async (newUser: UserType) => {
  // const createdUser = await createUserDB(newUser);
  // const createdUser = await createUserSQL(newUser);
  const createdUser = await createUserMongo(newUser);

  return createdUser;
};

export const deleteUser = async (id: string) => {
  //const deleteUser = await deleteUserDB(userId);
  // const deleteUser = await deleteUserSQL(id);
  const deleteUser = await deleteUserMongo(id);

  return deleteUser;
};

export const updateUser = async (userId: string, newUser: UserType) => {
  //const updatedUser = await updateUserDB(userId, newUser);
  // const updatedUser = await updateUserSQL(userId, newUser);
  const updatedUser = await upadteUserMongo(userId, newUser);

  return updatedUser;
};
