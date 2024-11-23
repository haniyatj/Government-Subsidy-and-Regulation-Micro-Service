//const Regulation = require('../models/Regulations');
//const ApplicantFarmer = require('../models/applicantFarmerModel');  //needed for the bookmark regulations function 


exports.createRegulation = async (req, res) => {
    try {
        const { title, description, effectiveDate, category, type, createdBy } = req.body;
       
        const newRegulation = await Regulation.create({
            title,
            description,
            effectiveDate,
            category,
            type,
            createdBy,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const notification = await Notification.create({
            id: uuidv4(),
            userId: req.user.id, 
            type: "new_regulation",
            message: `A new regulation titled "${newRegulation.title}" has been added.`,
            relatedId: newRegulation.id,
            isRead: false,
            createdAt: new Date().toISOString(),
        });

        
        res.status(201).json({ message: 'Regulation created successfully', regulation: newRegulation, notification: notification });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create regulation', error });
    }
};

// Controller to edit an existing regulation
exports.editRegulation = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Update the regulation
        const updatedRegulation = await Regulation.findByIdAndUpdate(
            id, 
            { ...updates, updatedAt: new Date() }, 
            { new: true }
        );
        
        if (!updatedRegulation) return res.status(404).json({ message: 'Regulation not found' });
        
        res.status(200).json({ message: 'Regulation updated successfully', regulation: updatedRegulation });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update regulation', error });
    }
};

// Controller to delete a regulation
exports.deleteRegulation = async (req, res) => {
    try {
        const { id } = req.params;

        // Delete the regulation
        const deletedRegulation = await Regulation.findByIdAndDelete(id);
        
        if (!deletedRegulation) return res.status(404).json({ message: 'Regulation not found' });
        
        res.status(200).json({ message: 'Regulation deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete regulation', error });
    }
};


// Function to get the sorted list of regulations for the feed
exports.getRegulations = async (req, res) => {
    const { sortBy } = req.query;  
    
    try {
      let sortCriteria = {};
  
      if (sortBy === 'date') {
        sortCriteria.effectiveDate = 1; 
      } else if (sortBy === 'type') {
        sortCriteria.type = 1; 
      }
  
      
      const regulations = await Regulation.find().sort(sortCriteria);
  
      
      res.json({
        success: true,
        regulations: regulations.map((reg) => ({
          title: reg.title,
          description: reg.description,
          effectiveDate: reg.effectiveDate.toISOString().split('T')[0], // Format date as YYYY-MM-DD
        }))
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Failed to fetch regulations' });
    }
  };
  

 //Function to get filtered regulations by category and region
  exports.getFilteredRegulations = async (req, res) => {
    const { category, region } = req.query; 
    let filterCriteria = {};
  
    try {
      
      if (category && Array.isArray(category)) {
        filterCriteria.category = { $in: category };  // Match any of the categories selected
      } else if (category) {
        filterCriteria.category = category;  // Single category filter
      }
  
      
      if (region) {
        filterCriteria.region = region;  
      }
  
      
      const regulations = await Regulation.find(filterCriteria);
  
      
      res.json({
        success: true,
        regulations: regulations.map((reg) => ({
          id: reg.id,
          title: reg.title,
          description: reg.description,
          effectiveDate: reg.effectiveDate.toISOString().split('T')[0],  // Formatting date as YYYY-MM-DD
          category: reg.category,
        }))
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Failed to fetch regulations' });
    }
  };

// Function to bookmark regulations for a farmer
exports.bookmarkRegulation = async (req, res) => {
    const { farmerId, regulationId } = req.body; // Expect farmerId and regulationId to be sent in the body of the request
  
    try {
      
      const farmer = await ApplicantFarmer.findById(farmerId);
  
      if (!farmer) {
        return res.status(404).json({ success: false, message: 'Farmer not found' });
      }
  
      
      if (farmer.bookmarkedRegulations.includes(regulationId)) {
        return res.status(400).json({ success: false, message: 'Regulation already bookmarked' });
      }
  
      
      farmer.bookmarkedRegulations.push(regulationId);
  
      
      await farmer.save();
  
      res.status(200).json({
        success: true,
        message: 'Regulation bookmarked successfully',
        bookmarkedRegulations: farmer.bookmarkedRegulations,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'An error occurred while bookmarking the regulation' });
    }
  };