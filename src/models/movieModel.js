const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String },
});

const Movie = mongoose.model('Movie', movieSchema, 'movies');

module.exports = Movie;
