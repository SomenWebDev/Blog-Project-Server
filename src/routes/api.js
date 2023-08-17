const express = require("express");
const blogController = require("../controllers/blogController");
const router = express.Router();
router.get("/readBlogs", blogController.getAllBlogs);
router.get("/readBlog/:id", blogController.getBlogById);
router.post("/createBlogs", blogController.createBlog);
router.post("/updateBlog/:id", blogController.updateBlog);
router.delete("/deleteBlog/:id", blogController.deleteBlog);

module.exports = router;
