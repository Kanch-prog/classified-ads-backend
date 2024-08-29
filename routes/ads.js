const express = require('express');
const Ad = require('../models/ads');
const authenticateToken = require('../middleware/authenticateToken'); 
const router = express.Router();
const stripe = require('stripe')('your-secret-key-here');

// Create a new ad
router.post('/', authenticateToken, async (req, res) => {
  const { title, description, price } = req.body;
  const newAd = new Ad({
    title,
    description,
    price,
    userId: req.user.id, 
  });

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

router.get('/user-ads', authenticateToken, async (req, res) => {
  console.log('Fetching ads for user:', req.user.id); 
  try {
    const ads = await Ad.find({ userId: req.user.id });
    console.log('Ads fetched:', ads); 
    res.json(ads);
  } catch (error) {
    console.error('Error fetching user ads:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/api/payment', async (req, res) => {
  try {
    const { id } = req.body;
    const payment = await stripe.paymentIntents.create({
      amount: 1000, // Amount in cents
      currency: 'usd',
      payment_method: id,
      confirm: true,
    });

    res.status(200).json({ success: true, payment });
  } catch (error) {
    console.error('Error processing payment', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
