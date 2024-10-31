//ApplicationController.js
//const SubsidyApplication = require('../models/SubsidyApplication');
//const ApplicationHistory = require('../models/ApplicationHistory');


//get filtered applications based on date,status,type
exports.getFilteredApplications = async (req, res) => {
    try {
        const { date, status, type, sortField, sortOrder } = req.query;

       
        const filter = {};
        if (status) filter.status = status;
        if (type) filter.subsidyType = type;
        if (date) filter.createdAt = { $gte: new Date(date) }; //Filter by date or later

        //define sort order: 1 for ascending, -1 for descending
        const sortOptions = {};
        if (sortField) sortOptions[sortField] = sortOrder === 'desc' ? -1 : 1;

        const applications = await SubsidyApplication.find(filter).sort(sortOptions);

        res.status(200).json({ applications });
    } catch (error) {
        console.error('Error fetching filtered applications:', error);
        res.status(500).json({ message: 'Error fetching applications' });
    }
};


//getng application history for a specific applicant 
exports.getApplicantApplicationHistory = async (req, res) => {
    try {
        const { applicantId } = req.params;

        const applications = await SubsidyApplication.find({ applicantId })
            .sort({ createdAt: 1 })
            .select('createdAt status subsidyType'); 

        const timeline = applications.map(app => ({
            submittedOn: app.createdAt,
            status: app.status,
            subsidyType: app.subsidyType,
        }));

        res.status(200).json({ applicantId, timeline });
    } catch (error) {
        console.error('Error fetching application history:', error);
        res.status(500).json({ message: 'Error fetching application history' });
    }
};


//Controller function to retrieve audit logs for a specific application
exports.getAuditLogsByApplicationId = async (req, res) => {
    const { applicationId } = req.params;
  
    try {
     
      const auditLogs = await ApplicationHistory.find({ applicationId });
  
      if (!auditLogs.length) {
        return res.status(404).json({ message: 'No audit logs found for this application ID' });
      }
  
      res.json(auditLogs);
    } catch (error) {
      console.error('Error retrieving audit logs:', error);
      res.status(500).json({ message: 'An error occurred while retrieving audit logs', error });
    }
  };
 