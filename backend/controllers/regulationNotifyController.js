
const { v4: uuidv4 } = require('uuid'); 
// const Regulation = require('../models/Regulation'); 
// const Notification = require('../models/Notification'); 

exports.addNewRegulation = async (req, res) => {
    try {
      
        const newRegulation = await Regulation.create({
            id: uuidv4(),
            title: req.body.title,
            description: req.body.description,
            effectiveDate: req.body.effectiveDate,
            category: req.body.category,
            type: req.body.type,
            createdBy: req.user.id, 
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
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

        res.status(201).json({
            message: "Regulation and notification created successfully",
            regulation: newRegulation,
            notification: notification
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating regulation or notification" });
    }
};
