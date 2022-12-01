import mongoose from "mongoose";
// import User from "./user.model";

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please enter a userId"],
    },
    titel: { type: String, required: [true, "Please enter a name"] },
    description: { type: String, required: false },
    condition: { type: String, required: [true, "Please select a condition"] },
    category: { type: String, required: [true, "Please select a category"] },
    brand: { type: String, required: [true, "Please select a brand"] },
    size: { type: String, required: [true, "Please select a size"] },
    gender: { type: String, required: [true, "Please select a gender"] },
    price: { type: Number, required: [true, "Please enter a price"] },
    photos: [String],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
