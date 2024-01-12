const mongoose = require('mongoose');

const cinemaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  city: { type: String, required: true },
});

const Cinema = mongoose.model('Cinema', cinemaSchema, 'cinemas');

module.exports = Cinema;
