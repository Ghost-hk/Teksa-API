import mongoose from "mongoose";
import express from "express";

import Post from "../models/post.model.js";

const router = express.Router();

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new Post(post);

  try {
    await newPost.save();

    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(409).json({ error: error });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { name, description, size, type, condition, price, photos, tags } =
    req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = {
    name,
    description,
    size,
    type,
    condition,
    price,
    photos,
    _id: id,
  };

  const result = await Post.findByIdAndUpdate(id, updatedPost, { new: true });

  return res.status(200).json(result);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await Post.findByIdAndRemove(id);

  return res.status(200).json({ message: "Post deleted successfully." });
};

export const getPostsByFilter = async (req, res) => {
  const filters = req.body;
  try {
    console.log(filters);
    const posts = await Post.find(filters);
    return res.status(404).json(posts);
  } catch (error) {
    return res.status(404).json(filters);
  }
};

export default router;
