

//const Notification = require('./models/Notifications'); // Import the Notification model

// 2. Get all notifications (for government officials)
exports.getNotification = async (req, res) => {
    try {
        const notifications = await Notification.find({ status: 'unread' });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve notifications' });
    }
};
