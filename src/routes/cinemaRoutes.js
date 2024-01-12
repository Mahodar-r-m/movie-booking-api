const express = require('express');
const router = express.Router();
const cinemaController = require('../controllers/cinemaController');

// Open API - Users can search for cinemas within their cities
router.get('/cinemas/:city', cinemaController.getCinemasInCity);

// Open API - Users can check all movies and show timings in a particular cinema
router.get('/cinema/:cinemaId', cinemaController.getMoviesAndShowTimingsInCinema);

module.exports = router;
