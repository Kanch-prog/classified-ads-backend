const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Add userId field
  imageUrl: { type: String }, // Optional: for ad images
  createdAt: { type: Date, default: Date.now }, // Optional: for tracking when the ad was created
});

module.exports = mongoose.model('Ad', adSchema);
