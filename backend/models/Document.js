// Document.js
const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    fileType: { type: String, enum: ['pdf', 'jpg', 'png'], required: true },
    fileSize: { type: Number, min: 0 },
    fileUrl: { type: String }, 
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    fileData: { type: Buffer }, 
    metadata: {
        originalName: { type: String },
        mimeType: { type: String },
    },
}, { timestamps: true });

module.exports = mongoose.model('Document', DocumentSchema);
