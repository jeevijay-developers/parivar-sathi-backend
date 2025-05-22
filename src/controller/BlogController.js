const Blog = require('../modals/Blog');

const getAllBlogs = async (req, res) => {
    try {
        const AllBlogs = await Blog.find();
        res.status(200).json(AllBlogs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Error fetching blogs" });
    }
};

const getBlog = async(req, res) => {
    try{
        const {id} = req.params;
        const blog = await Blog.findById(id);
        res.status(200).json(blog);
    }catch(err){
        console.error(err);
        res.status(500).json({ success: false, message: "Error fetching blogs" });
    }
}

module.exports = { getAllBlogs, getBlog };