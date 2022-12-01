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
    return res
      .status(409)
      .json({ message: "Somthing whent wrong, plz try again" });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { titel, description, size, type, condition, price, photos } = req.body;

  // Get the id of the current user
  const { _id } = req.user;

  // Get the id of the posts user
  const { user } = await Post.findOne({ _id: id });

  // Check if the user owns the post
  if (!user.equals(_id)) {
    return res
      .status(403)
      .json({ message: "You can't update posts that are not yours" });
  }
  // Check if the id is valid
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = {
    titel,
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

  // Get the id of the posts user
  const { user } = await Post.findOne({ _id: id });

  // Get the id of the current user
  const { _id } = req.user;

  // Check if the user owns the post
  if (!user.equals(_id)) {
    return res
      .status(403)
      .json({ message: "You can't delete posts that are not yours" });
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await Post.findByIdAndRemove(id);

  return res.status(200).json({ message: "Post deleted successfully.", id });
};

export const getPostsByFilter = async (req, res) => {
  const filters = req.body;
  try {
    const posts = await Post.find(filters);
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const getPostsByPage = async (req, res) => {
  try {
    const postPerPage = 2;
    const page = req.query.page || 1;

    const postsToSkip = (page - 1) * postPerPage;

    const postsCountPromise = Post.estimatedDocumentCount({});
    const postsPromise = Post.find({}).skip(postsToSkip).limit(postPerPage);

    const [postsCount, posts] = await Promise.all([
      postsCountPromise,
      postsPromise,
    ]);

    const pageCount = postsCount / postPerPage;

    if (page > pageCount) {
      return res.status(404).json({
        message: `Page count exceeded, max number of pages: ${pageCount}`,
      });
    }

    return res.status(200).json({
      pagination: {
        postsCount,
        pageCount,
      },
      posts,
    });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export default router;
