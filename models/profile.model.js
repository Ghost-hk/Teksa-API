import mongoose from "mongoose";
import User from "./user.model";

const profileSchema = mongoose.Schema({
  user: User,
  name: { type: String, required: true },
  city: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  photo: { type: String, required: true },
  price: { type: Number, required: true },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
