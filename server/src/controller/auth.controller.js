const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { useId } = require("react");

// =======Helper : Generate token =============
const generateToke = (userId) => {
  return jwt.sign(
    { id: userId }, //payload - what we embed in token
    process.env.JWT_SECRET, // secret key - used to sign & verify
    { expiresIn: "7d" }, // token expires in 7 days
  );
};

// ======REGISTER=====================
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1.validate
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All field required",
        success: false,
      });
    }

    // 2. check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already in use",
      });
    }
    // 3. hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create and save new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // 5. Return token + user info (never return password)

    res.status(201).json({
      token: generateToke(user._id),
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ======LOGIN=====================

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials!",
        success: false,
      });
    }

    // 2. Compare entered password with hashed password in DB

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // 3. Return token + user info
    res.status(200).json({
      token: generateToke(user._id),
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


module.exports = {register, login}