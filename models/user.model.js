import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter your first name"],
    },
    lastName: { type: String, required: [true, "Please enter your last name"] },
    email: {
      type: String,
      required: [true, "Please enter a valid email"],
      lowercase: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "is invalid"],
    },
    password: {
      type: String,
      required: [true, "Please enter a valid passwor"],
    },
    city: { type: String, required: false },
    phoneNumber: { type: Number, required: false },
    photo: { type: String, required: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
