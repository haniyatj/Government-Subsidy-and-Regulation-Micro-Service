

const express = require('express');
const router = express.Router();
const regulationController = require('../controllers/regulationController');

router.post('/addRegulation', regulationController.addNewRegulation);

module.exports = router;
