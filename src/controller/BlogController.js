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

        // Validate ObjectId to avoid Mongoose CastErrors (which returned 500)
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid blog id' });
        }

        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        return res.status(200).json(blog);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Error fetching blog' });
    }
};

module.exports = { getAllBlogs, getBlog };