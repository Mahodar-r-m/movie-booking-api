const Cinema = require('../models/cinemaModel');
const Movie = require('../models/movieModel');
const Show = require('../models/showModel');

exports.getAllMoviesInCity = async (req, res) => {
  try {
    const city = req.params.city;

    // 1. Find cinemas in the city
    const cinemasInCity = await Cinema.find({ city });

    // 2. Extract cinema IDs
    const cinemaIds = cinemasInCity.map((cinema) => cinema._id);

    // 3. Find shows associated with those cinemas
    const shows = await Show.find({ cinema: { $in: cinemaIds } });

    // 4. Get unique movie IDs from shows
    const uniqueMovieIds = new Set(shows.map((show) => show.movie));

    // 5. Fetch movie details for unique IDs
    const movies = await Movie.find({ _id: { $in: [...uniqueMovieIds] } });

    // 6. Structure response data
    const responseData = movies.map((movie) => {
      const cityShowings = shows.filter((show) => show.movie.equals(movie._id) && show.city === city);
      return {
        title: movie.title,
        genre: movie.genre,
        showings: cityShowings.map((showing) => ({
          cinema: {
            name: showing.cinema.name,
            location: showing.cinema.location,
          },
          timings: showing.timings,
        })),
      };
    });

    res.json({
      data: responseData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
