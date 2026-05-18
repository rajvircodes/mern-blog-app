const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

const protect = async (req, res, next) => {
  try {
    // 1. Check if Authorization header exists and starts with "Bearer"
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        message: "Not authorized, no token",
      });
    }

    // 2. Extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    // 3. verify token using our secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach user to request (excluding password)
    req.user = await User.findById(decoded.id).select("-password");
    next() // All good move to the actual route handler

  } catch (error) {
    res.status(401).json({
      message: "Not authorized, token failed",
    });
  }
};


module.exports = {protect}