const express = require('express');
const { Attraction, Visitor, Review } = require('../models/user');

const router = express.Router();

// Attraction CRUD Operations
router.post('/attractions', async (req, res) => {
  try {
    const attraction = new Attraction(req.body);
    await attraction.save();
    res.status(201).send(attraction);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/attractions', async (req, res) => {
  try {
    const attractions = await Attraction.find();
    res.send(attractions);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch('/attractions/:id', async (req, res) => {
  try {
    const attraction = await Attraction.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!attraction) return res.status(404).send();
    res.send(attraction);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Visitor CRUD Operations
router.post('/visitors', async (req, res) => {
  try {
    const visitor = new Visitor(req.body);
    await visitor.save();
    res.status(201).send(visitor);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/visitors', async (req, res) => {
  try {
    const visitors = await Visitor.find().populate('visitedAttractions');
    res.send(visitors);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Review POST (Ensuring visitor has visited the attraction)
router.post('/reviews', async (req, res) => {
  try {
    const { visitor, attraction, score, comment } = req.body;

    const visitorRecord = await Visitor.findById(visitor);
    if (!visitorRecord || !visitorRecord.visitedAttractions.includes(attraction)) {
      return res.status(400).send({ error: 'Visitor has not visited this attraction.' });
    }

    const review = new Review({ visitor, attraction, score, comment });
    await review.save();
    res.status(201).send(review);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
