import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

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
  if (!firstName || !lastName || !email || !password) {
    res.status(400).json({ message: "Please enter all required fields" });
    throw new Error("Please enter all required fields");
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: "Email already used" });
    throw new Error("Email already used");
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
    res
      .status(400)
      .json({ message: "Something went wrong, please try again." });
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
    res.status(400).json({ message: "Incorrect email or password" });
    throw new Error("Incorrect email or password");
  }
});

//@rout => api/auth/getprofileinfo
//@desc => Get profile Data
//@accses => public
export const getProfileData = asyncHandler(async (req, res) => {
  const { id } = req.body;
  try {
    const userInfo = await User.findOne({ _id: id }).select(
      "-password -createdAt -updatedAt -__v"
    );
    // Check if user exists
    if (userInfo) {
      res.status(200).json(userInfo);
    } else {
      res.status(400).json({ message: "No User found whit this id" });
      throw new Error("No User found whit this id", id);
    }
  } catch (error) {
    res.status(400).json({ message: "Somthing when wrong, please try again" });
    throw new Error("Somthing when wrong, please try again", error);
  }
});

export const getAllUsers = async (req, res) => {
  try {
    const result = await User.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err });
    throw new Error(err);
  }
};

export const getUserData = async (req, res) => {
  const { id } = req.params;
  const currUserID = req.user._id;

  if (!currUserID.equals(id)) {
    return res.status(403).json({
      message: "You are not the user you are tring to get info about",
    });
  }
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No User with id: ${id}`);

  const userInfo = await User.findOne({ _id: id }).select(
    "-password -createdAt -updatedAt -__v"
  );
  return res.status(200).json(userInfo);
};

export const updateUserData = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, location, phone, email, insta, fb } = req.body;

  // Get the id of the current user
  const currUserID = req.user._id;

  // Get the id of the posts user
  const { _id } = await User.findOne({ _id: id });

  // Check if the user owns the post
  if (!currUserID.equals(_id)) {
    return res
      .status(403)
      .json({ message: "You can't update posts that are not yours" });
  }
  // Check if the id is valid
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No User with id: ${id}`);

  const updatedUser = {
    firstName,
    lastName,
    location,
    phone,
    email,
    socialMedia: {
      facebook: fb,
      instagram: insta,
    },
  };

  console.log("all good from update controller");

  const result = await User.findByIdAndUpdate(id, updatedUser, {
    new: true,
  }).select("-password ");

  return res.status(200).json(result);
};

export default router;
