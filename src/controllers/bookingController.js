const Booking = require('../models/bookingModel');

exports.createBooking = async (req, res) => {
  try {
    req.body.user = req.userData.userId
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    // const bookings = await Booking.find({ user: req.userData.userId })
    // .populate('show.cinema') // Populate the "cinema" field within "show"
    // .populate('show.movie') // Populate the "movie" field within "show"
    // .select('-user'); // Exclude the "user" field from the response;

    const bookings = await Booking.find({ user: req.userData.userId })
      .populate({
        path: 'show',
        populate: {
          path: 'cinema',
          select: 'name location city'
        }
      })
      .populate({
        path: 'show.movie',
        select: 'title genre'
      })
      .select('-user -show'); // Exclude user and full show object
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

