const Blog = require("../models/blog");

exports.createBlog = async (req, res) => {
  try {
    const blogs = new Blog(req.body);
    await blogs.save();
    res.status(200).json({ status: "success", data: blogs });
  } catch (err) {}
};
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({ status: "success", data: blogs });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      res.status(200).json({ status: "success", data: blog });
    } else {
      res.status(404).json({ error: "Blog not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (blog) {
      res
        .status(200)
        .json({ status: "success", message: "Blog updated successfully" });
    } else {
      res.status(404).json({ error: "Blog Not Found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (blog) {
      res
        .status(200)
        .json({ status: "success", message: "Blog deleted successfully" });
    } else {
      res.status(404).json({ error: "Blog not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
