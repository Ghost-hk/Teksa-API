import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";

import User from "../models/user.model.js";

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_ACCESS_TOKEN, {
    expiresIn: "30d",
  });
};

//@rout => api/auth/register
//@desc => Register a new user
//@accses => public
export const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Check if all required fields are present
  if (!(firstName || lastName || email || password)) {
    res.status(400);
    throw new Error("Please enter all required fields required");
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("This email is already used by another user");
  }

  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Creat the user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  //Check if the user was created successfully
  if (user) {
    return res.status(201).json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@rout => api/auth/login
//@desc => Loginthe user
//@accses => public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  // Check if the passed email and password matches the ones in the dataBase
  if (user && (await bcrypt.compare(password, user.password))) {
    return res.status(200).json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

//@rout => api/auth/getme
//@desc => Get user Data
//@accses => public
export const getMe = asyncHandler(async (req, res) => {
  const user = req.user;
  res.status(200).json({ message: "user data", user });
});

export default router;
