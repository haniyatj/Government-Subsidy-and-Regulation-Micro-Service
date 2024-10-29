
//const SubsidyApplication = require('../models/SubsidyApplication'); //we'll use path that the DB team gives us for the shared models folder

const getApplicationStatus = async (req, res) => {
    try {
        const application = await SubsidyApplication.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const changeApplicationStatus = async (req, res) => {
    try {
        const application = await SubsidyApplication.findById(req.params.id);
        if (application) {
            // Toggle between the three statuses
            application.status = (application.status === 'pending')
                ? 'approved'
                : (application.status === 'approved')
                ? 'rejected'
                : 'pending';

            await application.save();
            res.json({ status: application.status });
        } else {
            return res.status(404).json({ message: 'Application not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getApplicationStatus, changeApplicationStatus };
