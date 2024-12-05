// controllers/documentController.js
const Document = require('../models/Document');
exports.addDocument = async (req, res) => {
  try {
      const { originalname, mimetype, size } = req.file; // File data from multer
      const { uploadedBy } = req.body; // Associated user ID

      const newDocument = new Document({
          filename: originalname,
          fileType: mimetype.split('/')[1], // Dynamic file type
          fileSize: size,
          uploadedBy,
          fileData: req.file.buffer,
          metadata: {
              originalName: originalname,
              mimeType: mimetype,
          },
      });

      await newDocument.save();
      res.status(201).json({ message: 'Document added successfully', documentId: newDocument._id });
  } catch (err) {
      console.error('Error adding document:', err);
      res.status(500).json({ error: 'Failed to add document' });
  }
};

// Controller to get a document
exports.getDocument = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the document by ID
        const document = await Document.findById(id);
        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }

        // Set the response headers for file download
        res.set({
            'Content-Type': document.metadata.mimeType,
            'Content-Disposition': `attachment; filename="${document.metadata.originalName}"`,
        });

        // Send the file buffer as the response
        res.send(document.fileData);
    } catch (err) {
        console.error('Error retrieving document:', err);
        res.status(500).json({ error: 'Failed to retrieve document' });
    }
};
