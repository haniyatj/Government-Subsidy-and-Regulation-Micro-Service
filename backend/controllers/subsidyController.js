
//const SubsidyApplication = require('../models/SubsidyApplication'); //we'll use path that the DB team gives us for the shared models folder
//const Notification = require('./models/Notifications'); // Import the Notification model

//const Subsidy = require('../models/Subsidy'); // Adjust path as per your project structure

const { v4: uuidv4 } = require('uuid');

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

        // Send notification to government official
        const notification = {
            id: uuidv4(),
            userId: 'official-uuid-here', // Replace with actual government official's user ID
            type: 'application_status',
            message: `A new subsidy application has been submitted by Farmer ${farmerId}.`,
            relatedId: savedApplication._id, // Reference to the new subsidy application
            isRead: false,
            createdAt: new Date(),
        };

        // Save the notification to the database
        await Notification.create(notification);

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

// Route to create a new subsidy
exports.CreateSubsidy= async (req, res) => {
    try {
      const { title, category, region, description, applicationDeadline, amount } = req.body;
  
      // Ensure all required fields are present
      if (!title || !category || !region || !description || !applicationDeadline || !amount) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Create a new subsidy object based on the received data
      const newSubsidy = new Subsidy({
        id: generateUniqueId(), // Generate a unique ID, depending on your system (e.g., UUID)
        title,
        category,
        region,
        description,
        applicationDeadline,
        amount,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
  
      // Save the subsidy to the database
      const savedSubsidy = await newSubsidy.save();
  
      // Respond with the saved subsidy data
      return res.status(201).json({
        message: 'Subsidy created successfully.',
        subsidy: savedSubsidy,
      });
  
    } catch (error) {
      console.error('Error creating subsidy:', error);
      return res.status(500).json({ message: 'Error creating subsidy', error });
    }
  };
  
  // Function to generate a unique ID (e.g., UUID or any other method)
  function generateUniqueId() {
    return require('uuid').v4();  // Using UUID for unique identifier
  }