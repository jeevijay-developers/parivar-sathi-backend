const cloudinary = require('cloudinary').v2;

// Configuration
cloudinary.config({ 
    cloud_name: 'ddy5oyvr2', 
    api_key: process.env.NEXT_AUTH_CLOUDINARY_API_KEY, 
    api_secret: process.env.NEXT_AUTH_CLOUDINARY_API_SECRET
});

const uploadToCloudinary = async (file, folder) => {
    try {
        const result = await cloudinary.uploader.upload(file.path, {
            folder: folder,
            resource_type: "auto",
            transformation: [
                { quality: "auto:best" },
                { fetch_format: "auto" }
            ]
        });
        
        return {
            public_id: result.public_id,
            url: result.secure_url
        };
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw error;
    }
};

module.exports = { uploadToCloudinary };