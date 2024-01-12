const Cinema = require('../models/cinemaModel');
const Movie = require('../models/movieModel');
const Show = require('../models/showModel');

// Users can search for cinemas within their cities
exports.getCinemasInCity = async (req, res) => {
  try {
    const city = req.params.city;
    const cinemasInCity = await Cinema.find({ city });
    res.status(200).json({ cinemas: cinemasInCity });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMoviesAndShowTimingsInCinema = async (req, res) => {
  try {
    const cinemaId = req.params.cinemaId;

    // 1. Find the cinema
    const cinema = await Cinema.findById(cinemaId);

    if (!cinema) {
      return res.status(404).json({ message: 'Cinema not found' });
    }

    // 2. Find shows for the cinema, populate movies along with timings
    const shows = await Show.find({ cinema })
      .populate('movie')
      .select({ _id: 0, movie: 1, timings: 1 });

    // 3. Structure the response
    const responseData = {
      cinema: {
        name: cinema.name,
        location: cinema.location,
        city: cinema.city,
      },
      movies: shows.map((show) => ({
        title: show.movie.title,
        genre: show.movie.genre,
        timings: show.timings,
      })),
    };

    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

