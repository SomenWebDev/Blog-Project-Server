const mongoose = require("mongoose");
const BlogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);
const Blog = mongoose.model("Blog", BlogPostSchema);
module.exports = Blog;
