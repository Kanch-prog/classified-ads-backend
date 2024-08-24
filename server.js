const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adRoutes = require('./routes/ads'); // Ensure this matches your file structure
require('dotenv').config(); // Load environment variables from .env file

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/ads', adRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI) // Removed deprecated options
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => console.error(err));

  console.log('MONGO_URI:', process.env.MONGO_URI);