const Blog = require('../modals/Blog');
const mongoose = require('mongoose');

const getAllBlogs = async (req, res) => {
    try {
        const AllBlogs = await Blog.find();
        res.status(200).json(AllBlogs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Error fetching blogs" });
    }
};

const getBlog = async (req, res) => {
    try {
        const { id } = req.params;

        // Try searching by slug first
        let specificBlog = await Blog.findOne({ slug: id });
        
        // If not found by slug, and id is a valid ObjectId, search by _id
        if (!specificBlog && mongoose.Types.ObjectId.isValid(id)) {
            specificBlog = await Blog.findById(id);
        }

        if (!specificBlog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        res.status(200).json(specificBlog);
    } catch (err) {
        console.error("Error specifically in getBlog endpoint:", err);
        res.status(500).json({ success: false, message: "Error fetching specific blog", error: err.message });
    }
};

module.exports = { getAllBlogs, getBlog };
