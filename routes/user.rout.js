import express from "express";
const router = express.Router();

import { protect } from "../middleware/authMiddleware.js";

import {
  registerUser,
  loginUser,
  getMe,
} from "../controllers/user.controller.js";

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/getme", protect, getMe);

export default router;
