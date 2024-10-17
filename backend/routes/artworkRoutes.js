const express = require('express');
const { submitArtwork, getArtworks, voteArtwork } = require('../controllers/artworkController');
const uploadMiddleware = require('../middlewares/uploadMiddleware');
const verifyToken = require('../middlewares/verifyToken'); // JWT middleware for authentication

const router = express.Router();

// POST route for submitting artwork (protected route, requires login)
router.post('/', verifyToken, uploadMiddleware.single('image'), submitArtwork);

// GET route for fetching all artworks (public route, no login required)
router.get('/', getArtworks);

// POST route for voting on artwork (protected route, requires login)
router.post('/:id/vote', verifyToken, voteArtwork);

module.exports = router;
