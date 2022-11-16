import express from "express";
const router = express.Router();

import { protect } from "../middleware/authMiddleware.js";

import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getPostsByFilter,
} from "../controllers/post.controller.js";

router.get("/", getPosts);
router.get("/filter", getPostsByFilter);

router.post("/", protect, createPost);
router.patch("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

export default router;
