const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const artworkRoutes = require('./routes/artworkRoutes');
const competitionRoutes = require('./routes/competitionRoutes');

const app = express();

// Test route
app.get('/test', (req, res) => {
  res.send("hello world");
});

// Middleware
app.use(express.json());
app.use(cors()); 

// Routes
app.use('/api/users', userRoutes);
app.use('/api/submissions', artworkRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/competitions', competitionRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
