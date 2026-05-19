const express = require("express");
const router = express.Router();

const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controller/post.controller.js");
const { protect } = require("../middleware/auth.middleware.js");

router.get("/", getAllPosts); // Public
router.get("/:id", getPostById); // Public
router.post("/", protect, createPost); // Protected
router.put("/:id", protect, updatePost); // Protected
router.delete("/:id", protect, deletePost); // Protected

module.exports = router;
