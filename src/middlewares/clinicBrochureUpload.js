const multer = require("multer");
const path = require("path");

// Temporarily store files in memory
const storage = multer.memoryStorage();

// File filter to accept only JPG, JPEG, and PDF files
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'application/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, JPEG, and PNG files are allowed!"));
  }
};

const uploadMiddleware = multer({
  storage,
  fileFilter,
}).single("brochureFile"); // Expecting a single field called 'brochureFile'

const { uploadToCloudinary } = require("../configure/cloudinary");

const clinicBrochureUpload = async (req, res, next) => {
  uploadMiddleware(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return next();
    }

    try {
      // Convert buffer to temporary file
      const tempFilePath = path.join(__dirname, `../../temp-${Date.now()}-${req.file.originalname}`);
      require('fs').writeFileSync(tempFilePath, req.file.buffer);
      
      // Upload to Cloudinary
      const result = await uploadToCloudinary({ path: tempFilePath }, 'clinicPartnerBrochure');
      
      // Clean up temp file
      require('fs').unlinkSync(tempFilePath);
      
      // Add the Cloudinary URL to the request
      req.file.filename = result.url;
      next();
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      return res.status(500).json({ error: 'Failed to upload file' });
    }
  });
};

module.exports = clinicBrochureUpload;
