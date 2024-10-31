// routes/ApplicationRoutes.js

const express = require('express');
const router = express.Router();
const { getFilteredApplications, getApplicantApplicationHistory,getAuditLogsByApplicationId } = require('../controllers/ApplicationController');


router.get('/filter', getFilteredApplications);
router.get('/history/:applicantId', getApplicantApplicationHistory);
router.get('/applications/:applicationId/audit-logs',getAuditLogsByApplicationId);

module.exports = router;
