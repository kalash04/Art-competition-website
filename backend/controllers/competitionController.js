const Competition = require('../models/Competition');

// Create a new competition
exports.createCompetition = async (req, res) => {
  const { name, description, categories, startDate, endDate } = req.body;

  try {
    const competition = new Competition({
      name,
      description,
      categories,
      startDate,
      endDate,
    });

    await competition.save();
    res.status(201).json(competition);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all competitions
exports.getCompetitions = async (req, res) => {
  try {
    const competitions = await Competition.find();
    res.json(competitions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single competition by ID
exports.getCompetitionById = async (req, res) => {
  try {
    const competition = await Competition.findById(req.params.id);
    if (!competition) {
      return res.status(404).json({ message: 'Competition not found' });
    }
    res.json(competition);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a competition
exports.updateCompetition = async (req, res) => {
  const { name, description, categories, startDate, endDate } = req.body;

  try {
    const competition = await Competition.findById(req.params.id);
    if (!competition) {
      return res.status(404).json({ message: 'Competition not found' });
    }

    competition.name = name || competition.name;
    competition.description = description || competition.description;
    competition.categories = categories || competition.categories;
    competition.startDate = startDate || competition.startDate;
    competition.endDate = endDate || competition.endDate;

    await competition.save();
    res.json(competition);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a competition
exports.deleteCompetition = async (req, res) => {
  try {
    const competition = await Competition.findById(req.params.id);
    if (!competition) {
      return res.status(404).json({ message: 'Competition not found' });
    }

    await competition.remove();
    res.json({ message: 'Competition deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
