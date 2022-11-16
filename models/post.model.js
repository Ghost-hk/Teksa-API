import mongoose from "mongoose";
// import User from "./user.model";

const postSchema = mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    name: { type: String, required: [true, "Please enter a name"] },
    description: String,
    gender: { type: String, required: [true, "Please select a gender"] },
    size: { type: String, required: [true, "Please select a size"] },
    type: { type: String, required: [true, "Please select a type"] },
    condition: { type: String, required: [true, "Please select a condition"] },
    price: { type: Number, required: [true, "Please enter a price"] },
    photos: [String],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
