const express = require('express');
const { Attraction, Visitor, Review } = require('../models/user');
const router = express.Router();

// Add a new Attraction
router.post('/attractions', async (req, res) => {
  try {
    const { name, location, entryFee } = req.body;
    if (entryFee < 0) return res.status(400).send({ error: 'Entry fee cannot be negative' });

    const attraction = new Attraction({ name, location, entryFee });
    await attraction.save();
    res.status(201).send(attraction);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Register a new Visitor
router.post('/visitors', async (req, res) => {
  try {
    const { name, email } = req.body;

    // Check if email is valid
    const existingVisitor = await Visitor.findOne({ email });
    if (existingVisitor) {
      return res.status(400).send({ error: 'Email already exists' });
    }

    const visitor = new Visitor({ name, email });
    await visitor.save();
    res.status(201).send(visitor);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Post a review for an Attraction
router.post('/reviews', async (req, res) => {
  try {
    const { visitor, attraction, score, comment } = req.body;

    const visitorRecord = await Visitor.findById(visitor);
    if (!visitorRecord) return res.status(404).send({ error: 'Visitor not found' });

    if (!visitorRecord.visitedAttractions.includes(attraction)) {
      return res.status(400).send({ error: 'Visitor has not visited this attraction.' });
    }

    // Ensure visitor hasn't already reviewed the attraction
    const existingReview = await Review.findOne({ visitor, attraction });
    if (existingReview) {
      return res.status(400).send({ error: 'Visitor has already reviewed this attraction.' });
    }

    const review = new Review({ visitor, attraction, score, comment });
    await review.save();

    // Update the attraction's average rating
    const reviews = await Review.find({ attraction });
    const avgRating = reviews.reduce((sum, review) => sum + review.score, 0) / reviews.length;

    await Attraction.findByIdAndUpdate(attraction, { rating: avgRating });

    res.status(201).send(review);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get top 5 highest-rated attractions
router.get('/attractions/topRated', async (req, res) => {
  try {
    const attractions = await Attraction.find().sort({ rating: -1 }).limit(5);
    res.send(attractions);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get visitors and the number of attractions they visited
router.get('/visitors/activity', async (req, res) => {
  try {
    const visitors = await Visitor.find().populate('visitedAttractions');
    const visitorActivity = visitors.map(visitor => ({
      name: visitor.name,
      visitedAttractionsCount: visitor.visitedAttractions.length,
    }));

    res.send(visitorActivity);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
