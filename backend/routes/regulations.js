const express = require('express');
const router = express.Router();
const regulationsController = require('../controllers/regulationsController');

// Route to create a new regulation
router.post('/', regulationsController.createRegulation);

// Route to edit an existing regulation
router.put('/:id', regulationsController.editRegulation);

// Route to delete an existing regulation
router.delete('/:id', regulationsController.deleteRegulation);

module.exports = router;
