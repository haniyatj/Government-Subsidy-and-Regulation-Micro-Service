const multer = require('multer');

// File size limit in bytes (e.g., 5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024; 

// Multer storage in memory
const storage = multer.memoryStorage();

// File filter for PDF files
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true); // Accept file
    } else {
        cb(new Error('Only PDF files are allowed!'), false); // Reject file
    }
};

// Multer upload middleware
const upload = multer({
    storage,
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter,
});

module.exports = upload;
