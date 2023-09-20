import bcrypt from "bcrypt";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Userlogin = void 0;
exports.Userlogin = {
  email: "admin@admin.com",
  password: bcrypt.hashSync("password", 10),
};
