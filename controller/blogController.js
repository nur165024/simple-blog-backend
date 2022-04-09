// internal imports
const Blog = require("../model/blog");

// get all blogs
async function getBlogs(req, res, next) {
  const { page = 1, limit = 5 } = req.query;

  const totalBlog = await Blog.countDocuments();

  try {
    const blogs = await Blog.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      data: blogs,
      page,
      limit,
      pages: Math.ceil(totalBlog / limit),
      message: "success",
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: error.message,
        },
      },
    });
  }
}
// create blog
async function createBlog(req, res, next) {
  let newBlog;

  newBlog = new Blog({
    ...req.body,
  });

  try {
    await newBlog.save();
    res.status(200).json({
      message: "Blog was create successfully!",
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Unknown error occurred!",
        },
      },
    });
  }
}
// single blog
async function singleBlog(req, res, next) {
  try {
    const singleBlog = await Blog.findById(req.params.blogId);
    res.status(200).json({ data: singleBlog, message: "success" });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: error.message,
        },
      },
    });
  }
}
// comment
async function commentBlog(req, res, next) {
  try {
    await Blog.findOneAndUpdate(
      { _id: req.params.blogId },
      { $push: { comment: { ...req.body } } }
    );

    res.status(200).json({ message: "Blog was commment successfully!" });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: error.message,
        },
      },
    });
  }
}

module.exports = { getBlogs, createBlog, singleBlog, commentBlog };