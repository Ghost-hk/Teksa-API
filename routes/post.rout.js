import express from "express";
const router = express.Router();

import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getPostsByFilter,
} from "../controllers/post.controller.js";

router.get("/", getPosts);
router.get("/filter", getPostsByFilter);

router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
