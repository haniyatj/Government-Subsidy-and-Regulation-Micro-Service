//multerMiddleware.js
const multer = require('multer');
const path = require('path');

// Define where to store the uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Path to save files locally (ensure this folder exists)
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); // Extract file extension
        const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`; // Generate a unique filename
        cb(null, filename); // Set the final filename
    },
});

// Set up Multer to handle file uploads
const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // Set file size limit (e.g., 50MB)
    fileFilter: (req, file, cb) => {
        const allowedTypes = /pdf|jpg|jpeg|png/; // Allowed file types (e.g., PDF, JPG, PNG)
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = allowedTypes.test(file.mimetype);

        if (extname && mimeType) {
            return cb(null, true); // Accept the file
        }
        cb('Error: File type not supported!');
    },
}).fields([{ name: 'cnicDocuments', maxCount: 5 }, { name: 'landDocuments', maxCount: 5 }]); // Allow multiple files

module.exports = upload;
