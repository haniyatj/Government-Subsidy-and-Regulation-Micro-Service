//const Regulation = require('../models/Regulations');


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
