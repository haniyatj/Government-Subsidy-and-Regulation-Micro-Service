//subsidySearchRoutes.js
const express = require('express');
const { filterSubsidies, searchSubsidyByTitle } = require('../controllers/subsidySearchController');

const router = express.Router();

router.get('/filter', filterSubsidies);
router.get('/search', searchSubsidyByTitle);

module.exports = router;
