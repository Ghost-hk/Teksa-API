import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, "is invalid"],
  },
  password: { type: String, required: true, minlength: 8, maxlength: 16 },
  povider: { type: String, required: true },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  // google
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },

});

const User = mongoose.model("User", userSchema);

export default User;
