const express = require("express");
const multer = require("multer");
const path = require("path");
const Blog = require("../modals/Blog");
const { uploadToCloudinary } = require("../configure/cloudinary");

const router = express.Router();

// Memory storage for temporary file handling
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Accept bannerImage and contentImages in the same upload
const uploadMiddleware = upload.fields([
  { name: "bannerImage", maxCount: 1 },
  { name: "contentImages", maxCount: 2 },
]);

// Middleware to handle Cloudinary uploads
const handleCloudinaryUpload = async (req, res, next) => {
  if (!req.files) return next();

  try {
    // Handle banner image
    if (req.files.bannerImage) {
      const bannerFile = req.files.bannerImage[0];
      const tempFilePath = path.join(__dirname, `../../temp-banner-${Date.now()}-${bannerFile.originalname}`);
      require('fs').writeFileSync(tempFilePath, bannerFile.buffer);
      const bannerResult = await uploadToCloudinary({ path: tempFilePath }, 'blog-banners');
      require('fs').unlinkSync(tempFilePath);
      req.files.bannerImage[0].filename = bannerResult.url;
    }

    // Handle content images
    if (req.files.contentImages) {
      const contentResults = await Promise.all(
        req.files.contentImages.map(async (file) => {
          const tempFilePath = path.join(__dirname, `../../temp-content-${Date.now()}-${file.originalname}`);
          require('fs').writeFileSync(tempFilePath, file.buffer);
          const result = await uploadToCloudinary({ path: tempFilePath }, 'blog-content');
          require('fs').unlinkSync(tempFilePath);
          return result.url;
        })
      );
      req.files.contentImages = contentResults.map((url, index) => ({
        ...req.files.contentImages[index],
        filename: url
      }));
    }

    next();
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    res.status(500).json({ error: 'Failed to upload images' });
  }
};

router.post("/add-blog", uploadMiddleware, handleCloudinaryUpload, async (req, res) => {
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

router.get("/AllBlogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching blogs" });
  }
});

module.exports = router;
