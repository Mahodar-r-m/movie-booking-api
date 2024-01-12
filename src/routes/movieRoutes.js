const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Open API - Users can search for movies within their cities
router.get('/:city', movieController.getAllMoviesInCity);

module.exports = router;
