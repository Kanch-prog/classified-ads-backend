const express = require('express');
const Ad = require('../models/ads');
const router = express.Router();

// Create a new ad
router.post('/', async (req, res) => {
  const { title, description, price } = req.body;
  const newAd = new Ad({ title, description, price });

  try {
    const savedAd = await newAd.save();
    res.status(201).json(savedAd);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all ads
router.get('/', async (req, res) => {
  try {
    const ads = await Ad.find();
    res.json(ads);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
