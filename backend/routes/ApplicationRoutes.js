// routes/ApplicationRoutes.js

const express = require('express');
const router = express.Router();
const subsidyApplicationController = require('../controllers/SubsidyApllicationController');


// Get all applications and create a new application
router.route('/')
    .post(subsidyApplicationController.createApplication)
    .get(subsidyApplicationController.getAllApplications);

// Get, update, or delete a specific application by ID
// Get, update, or delete a specific application by ID
router.route('/:id')
    .put(subsidyApplicationController.updateApplication)
    .delete(subsidyApplicationController.deleteApplication);
// router.get('/filter', getFilteredApplications);
// router.get('/history/:applicantId', getApplicantApplicationHistory);
// router.get('/applications/:applicationId/audit-logs',getAuditLogsByApplicationId);
 module.exports = router;
