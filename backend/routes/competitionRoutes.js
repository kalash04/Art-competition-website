const express = require('express');
const {
  createCompetition,
  getCompetitions,
  getCompetitionById,
  updateCompetition,
  deleteCompetition
} = require('../controllers/competitionController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Create a new competition (admin route)
router.post('/', protect, createCompetition);

// Get all competitions
router.get('/', getCompetitions);

// Get competition by ID
router.get('/:id', getCompetitionById);

// Update competition (admin route)
router.put('/:id', protect, updateCompetition);

// Delete competition (admin route)
router.delete('/:id', protect, deleteCompetition);

module.exports = router;
