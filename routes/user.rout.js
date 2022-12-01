import express from "express";
const router = express.Router();

import { protect } from "../middleware/authMiddleware.js";

import {
  registerUser,
  loginUser,
  getProfileData,
  getAllUsers,
  getUserData,
  updateUserData,
} from "../controllers/user.controller.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/getprofileinfo", getProfileData);

router.patch("/updateuserdata/:id", protect, updateUserData);
router.get("/getuserdata/:id", protect, getUserData);

router.get("/getallusers", getAllUsers);

export default router;
