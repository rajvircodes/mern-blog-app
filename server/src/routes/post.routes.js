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
const upload = require('../middleware/upload.middleware.js') 

router.get("/", getAllPosts); // Public
router.get("/:id", getPostById); // Public
router.post("/", protect, upload.single("coverImage"), createPost); // Protected
router.put("/:id", protect,upload.single("coverImage"), updatePost); // Protected
router.delete("/:id", protect, deletePost); // Protected

module.exports = router;
