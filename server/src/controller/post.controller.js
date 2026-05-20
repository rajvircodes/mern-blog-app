const Post = require("../models/post.model.js");

// =======CREATE POST===================

const createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    const coverImage = req.file ? req.file.filename:"";


    const post = await Post.create({
      title,
      content,
      category,
      coverImage,
      author: req.user._id, // comes from auth middleware
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// =======GET ALL POST===================

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ====== GET SINGLE POST ========

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "username email",
    );

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ====== UPDATE POST =========

const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Authorization check — is this user the owner?
    if (post.author.toString() !== req.user.id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this post" });
    }

    const { title, content, category } = req.body;

    post.title = title || post.title;
    post.content = content || post.content;
    post.category = category || post.category;

    if(req.file){
      post.coverImage = req.file.filename;
    }

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log("Error in update post", error);
    return res.status(500).json({ message: "Server error", error: error.message });
    
  }
};

// ======= DELETE POST ============

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }

    // Authorization check - owner only

    if (post.author.toString() !== req.user._id.toString()) {
      res.status(403).json({ message: "Not authorized to delete this post" });
    }

    await post.deleteOne();
    return res.status(200).json({
      message: "Post deleted successfully!",
    });
  } catch (error) {
    console.log("Error in update post", error);
    return res.status(500).json({ message: "Server error", error: error.message });
    
  }
};


module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
}