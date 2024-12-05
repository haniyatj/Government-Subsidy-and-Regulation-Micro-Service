const SubsidyApplication = require('../models/SubsidyApplication');
const FarmerProfile = require('../models/FarmerProfile');
const Subsidy = require('../models/Subsidy');

const subsidyApplicationController = {

    async getAllApplications(req, res, next) {
        try {
            const applications = await SubsidyApplication.find(); 
            console.log("applications",applications)
            res.status(200).json(applications);

        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
        }
    },
  
    // Create a new subsidy application
    async createApplication(req, res, next) {
        try {
            const { farmer, subsidy, status, supportingDocuments } = req.body;
            console.log("farmer",farmer)
           // const farmerExists = await FarmerProfile.findOne({ _id: farmer });
           // console.log("farmerExists",farmerExists)
            // if (!farmerExists) {
            //     return next({ status: 404, message: 'Farmer profile not found' });
            // }
            console.log("farmer",subsidy)
            console.log("farmer",subsidy)
            //const subsidyExists = await Subsidy.findOne({ _id: subsidy });
            console.log("farmer",subsidy)
           // console.log("subsidyExists",subsidyExists)

            // if (!subsidyExists) {
            //     return next({ status: 404, message: 'Subsidy not found' });
            // }

            const newApplication = new SubsidyApplication({
                farmer,
                subsidy,
                status,
                supportingDocuments,
            });

            await newApplication.save();
            res.status(201).json(newApplication);
        } catch (error) {
            next({ status: 500, message: 'Internal Server Error', error });
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
