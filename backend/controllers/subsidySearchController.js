//subsidySearchController.js
//const Subsidy = require('../models/Subsidy'); 

//Function to filter subsidies by region and/or category
const filterSubsidies = async (req, res) => {
    try {
        const { region, category } = req.query;
        const query = {};

        if (region) query.region = region;
        if (category) query.category = category;

        const subsidies = await Subsidy.find(query);
        res.json(subsidies);
    } catch (error) {
        console.error('Error filtering subsidies:', error);
        res.status(500).json({ error: 'Server error while filtering subsidies' });
    }
};


const searchSubsidyByTitle = async (req, res) => {
    try {
        const { title } = req.query;

        if (!title) {
            return res.status(400).json({ error: 'Title parameter is required for search' });
        }

        const subsidies = await Subsidy.find({ title: { $regex: title, $options: 'i' } });
        res.json(subsidies);
    } catch (error) {
        console.error('Error searching subsidies by title:', error);
        res.status(500).json({ error: 'Server error while searching subsidies' });
    }
};

module.exports = {
    filterSubsidies,
    searchSubsidyByTitle
};
