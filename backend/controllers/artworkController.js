const Artwork = require('../models/Artwork'); // Ensure this path is correct

// Function to submit artwork
const submitArtwork = async (req, res) => {
  const { title, description, category } = req.body;
  const image = req.file ? req.file.path.replace(/\\/g, '/') : null; // Assuming Multer for file uploads

  try {
    // Create a new artwork submission, associating it with the authenticated user
    const newArtwork = new Artwork({
      title,
      description,
      category,
      image,
      votes: 0, // Initialize votes
      voters: [], // Initialize empty voters array
      submittedBy: req.user.id, // Track the user who submitted the artwork
    });

    // Save the new artwork
    await newArtwork.save();
    res.status(201).json({ message: 'Artwork submitted successfully', artwork: newArtwork });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error submitting artwork', error });
  }
};

// Function to get all artworks
const getArtworks = async (req, res) => {
  try {
    const artworks = await Artwork.find(); // Fetch all artworks from the database
    res.status(200).json(artworks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching artworks', error });
  }
};

// Function to vote for an artwork
const voteArtwork = async (req, res) => {
  const { id } = req.params; // Artwork ID from request parameters
  const userId = req.user.id; // Get the authenticated user's ID from the request

  try {
    // Find the artwork by its ID
    const artwork = await Artwork.findById(id);
    if (!artwork) {
      return res.status(404).json({ message: 'Artwork not found' });
    }

    // Check if the user has already voted for this artwork
    if (artwork.voters.includes(userId)) {
      return res.status(400).json({ message: 'You have already voted for this artwork' });
    }

    // Add the user's ID to the voters array and increment the vote count
    artwork.voters.push(userId);
    artwork.votes += 1;

    // Save the updated artwork with the new vote and voter
    await artwork.save();
    res.status(200).json({ message: 'Vote counted successfully', votes: artwork.votes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error voting', error });
  }
};

// Export the controller functions
module.exports = {
  submitArtwork,
  getArtworks,
  voteArtwork,
};
