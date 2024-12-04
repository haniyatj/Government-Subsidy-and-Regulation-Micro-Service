const multer = require('multer');
const path = require('path');
const Document = require('../models/Document'); 
const bucket = require('../firebaseConfig');

// Setup Multer to handle incoming file uploads
const storage = multer.memoryStorage(); // Use memory storage instead of disk storage

const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // Set max file size to 50MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = /pdf|jpg|jpeg|png/; // Allowed file types
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = allowedTypes.test(file.mimetype);

        if (extname && mimeType) {
            return cb(null, true); // Accept file
        }
        cb('Error: File type not supported!');
    },
}).fields([{ name: 'cnicDocuments', maxCount: 5 }, { name: 'landDocuments', maxCount: 5 }]); // Multiple files

// Controller to handle document upload and save metadata to the database

// Controller to handle document upload and save metadata to the database
const uploadDocuments = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files uploaded');
        }

        const { cnicDocuments, landDocuments } = req.files;
        const { uploadedBy } = req.body; // Get uploadedBy from the form data

        // Function to upload files to Firebase Storage and save metadata to MongoDB
        const uploadFileToFirebase = async (file) => {
            const blob = bucket.file(file.originalname);
            const blobStream = blob.createWriteStream({
                metadata: {
                    contentType: file.mimetype,
                },
            });

            return new Promise((resolve, reject) => {
                blobStream.on('error', (error) => reject(error));
                blobStream.on('finish', async () => {
                    // Get the public URL of the uploaded file
                    const fileUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

                    // Save the document metadata to MongoDB
                    const newDocument = new Document({
                        filename: file.originalname,
                        fileType: path.extname(file.originalname).substring(1),
                        fileSize: file.size,
                        fileUrl: fileUrl,
                        metadata: {
                            originalName: file.originalname,
                            mimeType: file.mimetype,
                        },
                        uploadedBy: uploadedBy,
                    });

                    const savedDocument = await newDocument.save(); // Save document to MongoDB
                    resolve(savedDocument); // Resolve the full document object
                });

                blobStream.end(file.buffer); // Upload file buffer to Firebase Storage
            });
        };

        // Upload CNIC documents to Firebase Storage and save metadata
        const cnicResults = await Promise.all(
            cnicDocuments.map(uploadFileToFirebase)
        );

        // Upload Land documents to Firebase Storage and save metadata
        const landResults = await Promise.all(
            landDocuments.map(uploadFileToFirebase)
        );

        return res.status(200).json({
            success: true,
            cnicDocuments: cnicResults, // Full documents for CNIC
            landDocuments: landResults, // Full documents for Land
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    uploadDocuments,
};


module.exports = {
    uploadDocuments,
};
