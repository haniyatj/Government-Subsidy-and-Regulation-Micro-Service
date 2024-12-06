const SubsidyApplication = require('../models/SubsidyApplication');
const FarmerProfile = require('../models/FarmerProfile');
const Subsidy = require('../models/Subsidy');
const User = require('../models/User'); 
const Notification =require('../models/notification')


const subsidyApplicationController = {

      // Get all subsidy applications
  async getAllApplications(req, res, next) {
    try {
        console.log ('www')
        const applications = await SubsidyApplication.find()
        .populate("farmer", "farmDetails creditScore bankDetails")
        .populate("subsidy", "title category region amount description")
        .populate("supportingDocuments", "fileData fileType metadata")

        .populate({
          path: "farmer",
          populate: {
            path: "user",
            select: "username", 
          },
        });
        console.log ('www')
        res.json (applications)
    } catch (error) {
        console.error("Error fetching subsidy applications:", error);
        next({ status: 500, message: "Internal Server Error", error });
      }
  },
  
    // Create a new subsidy application
async createApplication(req, res, next) {
    try {
        const { farmer, subsidy, status, supportingDocuments, user } = req.body;
        console.log("farmer", farmer);
        console.log("subsidy", subsidy);

        // Create a new subsidy application
        const newApplication = new SubsidyApplication({
            farmer,
            subsidy,
            status,
            supportingDocuments,
        });

        await newApplication.save();

        // Create a new notification
        const newNotification = new Notification({
            user, 
            type: 'application_status',
            message: 'A subsidy application has been submitted',
            isRead: false,
        });

        await newNotification.save();

        res.status(201).json({
            application: newApplication,
            notification: newNotification,
        });
    } catch (error) {
        next({ status: 500, message: 'Internal Server Error', error });
    }
},

// Get  subsidy application by id
  async getApplicationById(req, res, next) {
    try {
        console.log ('w1w1w1')
        const application = await SubsidyApplication.findById(req.params.id)
        .populate("farmer", "farmDetails creditScore bankDetails")
        .populate("subsidy", "title category region amount description")
        .populate("supportingDocuments", "fileData fileType metadata")

        .populate({
          path: "farmer",
          populate: {
            path: "user",
            select: "username", 
          },
        });
        console.log ('application',application)
        res.json (application)
    } catch (error) {
        console.error("Error fetching subsidy applications:", error);
        next({ status: 500, message: "Internal Server Error", error });
      }
  },

    // Update an existing subsidy application
    async updateApplication(req, res, next) {
        try {
            const updates = req.body;

            const application = await SubsidyApplication.findByIdAndUpdate(
                req.params.id,
                updates,
                { new: true, runValidators: true }
            )
                .populate('farmer', 'farmDetails creditScore bankDetails')
                .populate('subsidy', 'name description eligibilityCriteria')
                .populate('supportingDocuments', 'url type');
            if (!application) {
                return next({ status: 404, message: 'Subsidy Application not found' });
            }

            res.json(application);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },

    // Delete a subsidy application
    async deleteApplication(req, res, next) {
        try {
            const application = await SubsidyApplication.findByIdAndDelete(req.params.id);
            if (!application) {
                return next({ status: 404, message: 'Subsidy Application not found' });
            }

            res.json({ message: 'Subsidy Application deleted successfully', application });
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },
};

module.exports = subsidyApplicationController;
