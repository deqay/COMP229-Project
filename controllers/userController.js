const User = require("../models/user");
const Product = require("../models/products");
const Review = require("../models/reviews");
const bcrypt = require("bcrypt");
const sendToken = require("../utils/jwtToken");
const catchAsyncError = require("../middleware/catchAsyncError");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

//create user

const createUser = async (req, res) => {
  console.log("Request received for user signup");
  try {
    const { name, email, password } = req.body;

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    sendToken(newUser, 201, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET all users

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
};

// fetch user by id

const getUserById = async (req, res) => {
  try {
    const userId = req.params.userid;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// update user

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userid;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: "Error updating user" });
  }
};

// delete user

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userid);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.json({ message: "User deleted." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//user sign in

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    sendToken(user, 200, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// logout user
const signOut = (req, res) => {
  try {
    console.log("done");
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({ message: "Successfully signed out!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
};

const getReviwsByProductId = async (req, res) => {
  const searchString = req.query.searchString;

  try {
    const products = await Review.find({
      productId: { $regex: searchString, $options: "i" },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.productid;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const postReview = async (req, res) => {
  try {
    const { userId, productId, name, comment, rating } = req.body;

    const newReview = new Review({
      userId,
      productId,
      name,
      comment,
      rating,
    });

    await newReview.save();

    res.status(201).json({ message: "Successfully comment posted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProfile = (req, res) => {
  res.send(req.user);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  signIn,
  signOut,
  getAllProducts,
  getAllReviews,
  getReviwsByProductId,
  getProductById,
  postReview,
  getProfile,
};
