const express = require('express');
const router = express.Router();
const subsidyApplicationController = require('../controllers/subsidyController'); // Adjust the path to your controller file if necessary

// Route to get the status of an application by ID
router.get('/:id/status', subsidyApplicationController.getApplicationStatus);

// Route to change the status of an application by ID
router.put('/:id/status', subsidyApplicationController.changeApplicationStatus);

// Route to submit a new application
router.post('/:id', subsidyApplicationController.submitApplication);

router.post('/create-subsidy', subsidyApplicationController.CreateSubsidy);


module.exports = router;
