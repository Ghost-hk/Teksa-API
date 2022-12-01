import mongoose from "mongoose";

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
    location: { type: String, required: false },
    phone: { type: Number, required: false },
    photo: { type: String, required: false },
    socialMedia: {
      facebook: { type: String, required: false },
      instagram: { type: String, required: false },
    },
  },
  { timestamps: true },
  { minimize: false }
);

const User = mongoose.model("User", userSchema);

export default User;
