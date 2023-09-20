import bcrypt from "bcrypt";
interface userLogin {
  email: string;
  password: string;
}

export const Userlogin: userLogin = {
  email: "admin@admin.com",
  password: bcrypt.hashSync("password", 10),
};
