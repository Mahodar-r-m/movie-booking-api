const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
  cinema: { type: mongoose.Schema.Types.ObjectId, ref: 'Cinema', required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  timings: [{ type: String, required: true }], // Assuming timings are represented as strings
});

const Show = mongoose.model('Show', showSchema, 'shows');

module.exports = Show;
