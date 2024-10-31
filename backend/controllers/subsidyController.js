
//const SubsidyApplication = require('../models/SubsidyApplication'); //we'll use path that the DB team gives us for the shared models folder

exports.getApplicationStatus = async (req, res) => {
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

exports.changeApplicationStatus = async (req, res) => {
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

exports.submitApplication = async (req, res) => {
    try {
        const { id: farmerId } = req.params; // Get farmerId from URL parameters
        const {
            subsidyId,
            subsidyType,
            supportingDocuments,
            status = "pending", // Default status
        } = req.body;

        // Create a new subsidy application object
        const newApplication = {
            farmerId, // Use farmerId from params
            subsidyId,
            subsidyType,
            supportingDocuments,
            status,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        // Save the application to the database
        const savedApplication = await SubsidyApplications.create(newApplication);

        // Respond with the saved application
        return res.status(201).json({
            message: 'Subsidy application submitted successfully.',
            application: savedApplication,
        });
    } catch (error) {
        console.error('Error submitting application:', error);
        return res.status(500).json({ message: 'Error submitting application', error });
    }
};



