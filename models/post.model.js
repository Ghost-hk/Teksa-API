import mongoose from "mongoose";
// import Profile from "./profile.model";

const postSchema = mongoose.Schema({
  // profile: { type: mongoose.Types.ObjectId, ref: "Profile" },
  name: { type: String, required: true },
  description: String,
  size: { type: String, required: true },
  type: { type: String, required: true },
  condition: { type: String, required: true },
  price: { type: Number, required: true },
  photos: [String],
  tags: [String],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
