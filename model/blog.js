const mongoose = require("mongoose");

// children comment schema
const childrenCommentSchema = new mongoose.Schema(
  {
    childrenCommentId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    name: {
      type: String,
      require: true,
      trim: true,
    },
    comment: {
      type: String,
      require: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// comment schema
const commentSchema = new mongoose.Schema(
  {
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    name: {
      type: String,
      require: true,
      trim: true,
    },
    comment: {
      type: String,
      require: true,
      trim: true,
    },
    childrenComment: [childrenCommentSchema],
  },
  {
    timestamps: true,
  }
);

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
    },
    content: {
      type: String,
      require: true,
      trim: true,
    },
    date: {
      type: Date,
      require: true,
      trim: true,
    },
    comment: [commentSchema],
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
