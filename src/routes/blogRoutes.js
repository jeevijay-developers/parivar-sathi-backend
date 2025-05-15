const express = require("express");
const multer = require("multer");
const path = require("path");
const Blog = require("../modals/Blog");

const router = express.Router();

// Unified storage for all images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/blogImages");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage });

// Accept bannerImage and contentImages in the same upload
const blogUpload = upload.fields([
  { name: "bannerImage", maxCount: 1 },
  { name: "contentImages", maxCount: 2 },
]);

router.post("/add-blog", blogUpload, async (req, res) => {
  try {
    const { title, desc, content } = req.body;
    const bannerImage = req.files.bannerImage?.[0]?.filename;
    const contentImages =
      req.files.contentImages?.map((img) => img.filename) || [];

    const blog = new Blog({
      title,
      desc,
      content,
      bannerImage,
      contentImages,
    });

    await blog.save();
    res.status(201).json({ success: true, blog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error saving blog" });
  }
});

module.exports = router;
