// external import
const express = require("express");

// internal import
const {
  getBlogs,
  createBlog,
  singleBlog,
  commentBlog,
} = require("../controller/blogController");
const {
  blogValidator,
  blogValidatorMessageHandler,
} = require("../middlewares/blog/blogValidators");

const router = express.Router();

// get blogs router
router.get("/", getBlogs);

// create blog router
router.post("/", blogValidator, blogValidatorMessageHandler, createBlog);

// single blog router
router.get("/:blogId", singleBlog);

// comment blog router
router.put("/comment/:blogId", commentBlog);

// single comment blog find

module.exports = router;
