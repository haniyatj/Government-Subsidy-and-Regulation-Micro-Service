const express = require('express');
const router = express.Router();
const { uploadDocuments } = require('../controllers/documentController');
const multer = require('../MiddleWare/multerMiddleware');


router.post('/upload', multer, uploadDocuments);

module.exports = router;
