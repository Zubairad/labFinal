const mongoose = require('mongoose');

// Attraction Schema
const attractionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  entryFee: {
    type: Number,
    required: true,
    min: [0, 'Entry fee cannot be negative'],
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating must be between 0 and 5'],
    max: [5, 'Rating must be between 0 and 5'],
  },
});

// Visitor Schema
const visitorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
  },
  visitedAttractions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Attraction',
    },
  ],
});

// Review Schema
const reviewSchema = new mongoose.Schema({
  attraction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attraction',
    required: true,
  },
  visitor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Visitor',
    required: true,
  },
  score: {
    type: Number,
    required: true,
    min: [1, 'Score must be between 1 and 5'],
    max: [5, 'Score must be between 1 and 5'],
  },
  comment: {
    type: String,
  },
});

reviewSchema.index({ visitor: 1, attraction: 1 }, { unique: true });

// Model Exports
const Attraction = mongoose.model('Attraction', attractionSchema);
const Visitor = mongoose.model('Visitor', visitorSchema);
const Review = mongoose.model('Review', reviewSchema);

module.exports = { Attraction, Visitor, Review };
