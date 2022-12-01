import express from "express";
const router = express.Router();

import { protect } from "../middleware/authMiddleware.js";

import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getPostsByFilter,
  getPostsByPage,
} from "../controllers/post.controller.js";

router.get("/", getPosts);
router.post("/filter", getPostsByFilter);

router.get("/page", getPostsByPage);

router.post("/", protect, createPost);
router.patch("/edit/:id", protect, updatePost);
router.delete("/delete/:id", protect, deletePost);

export default router;
