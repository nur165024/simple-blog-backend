// external import
const express = require("express");

// internal import
const {
  getBlogs,
  createBlog,
  singleBlog,
  blogComment,
  childrenBlogComment,
} = require("../controller/blogController");
const {
  blogValidator,
  blogValidatorMessageHandler,
  blogCommentValidator,
} = require("../middlewares/blog/blogValidators");

const router = express.Router();

// get blogs router
router.get("/", getBlogs);

// create blog router
router.post("/", blogValidator, blogValidatorMessageHandler, createBlog);

// single blog router
router.get("/:blogId", singleBlog);

// comment blog router
router.post(
  "/comment/:blogId",
  blogCommentValidator,
  blogValidatorMessageHandler,
  blogComment
);

// children blog comment
router.post(
  "/children/comment/:blogId/:childrenId",
  blogCommentValidator,
  blogValidatorMessageHandler,
  childrenBlogComment
);

module.exports = router;
