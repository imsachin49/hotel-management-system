import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcrypt";

export interface User extends Document {
  email: string;
  password: string;
  isValidPassword: (password: string) => Promise<boolean>;
}

const UserSchema = new mongoose.Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre<User>("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (password: string) {
  const user = this as User;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

export const UserModel: Model<User> = mongoose.model<User>("user", UserSchema);
