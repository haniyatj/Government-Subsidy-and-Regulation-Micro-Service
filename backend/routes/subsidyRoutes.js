
const express = require('express');
const { getApplicationStatus, changeApplicationStatus } = require('../controllers/subsidyController');
//here we can keep adding whatever other controllers that we need
const router = express.Router();

router.get('/:id/status', getApplicationStatus);
router.post('/:id/status', changeApplicationStatus);

module.exports = router;
