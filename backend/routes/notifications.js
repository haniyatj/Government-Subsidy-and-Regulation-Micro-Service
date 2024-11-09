const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/subsidyNotificationsController');


// Route to get all unread notifications for govern official subsidy applications
router.get('/', notificationController.getNotification);

module.exports = router;
