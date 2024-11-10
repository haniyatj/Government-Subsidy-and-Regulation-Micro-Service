const express = require('express');
const router = express.Router();
const regulationsController = require('../controllers/regulationsController');


//Route to get a sorted list of regulations for the feed
router.get('/',regulationsController.getRegulations)

//Route to get a filtered (by category and region) list of regulations for the feed 
router.get('/filtered', getFilteredRegulations);

//Route to bookmark a regulation 
router.post('/bookmark', regulationsController.bookmarkRegulation);

// Route to create a new regulation
router.post('/', regulationsController.createRegulation);

// Route to edit an existing regulation
router.put('/:id', regulationsController.editRegulation);

// Route to delete an existing regulation
router.delete('/:id', regulationsController.deleteRegulation);

module.exports = router;
