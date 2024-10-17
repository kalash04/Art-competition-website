const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtworkSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String },
  votes: { type: Number, default: 0 },
  voters: [{ type: String }], // Array to store user IDs of voters
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId, // Assuming you want to reference a user
    ref: 'User', // Ensure you have a User model
    required: true,
  },
}, { timestamps: true }
);

module.exports = mongoose.model('Artwork', ArtworkSchema);
