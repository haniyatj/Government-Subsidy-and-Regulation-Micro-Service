// routes/documentRoutes.js
const express = require('express');
const upload = require('../Middleware/multerMiddleware'); 
const documentController = require('../controllers/documentController');

const router = express.Router();

// Route to add a document
router.post('/add', upload.single('file'), documentController.addDocument);


// Route to get a document
router.get('/:id', documentController.getDocument);

module.exports = router;
