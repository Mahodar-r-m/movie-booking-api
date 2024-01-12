const router = require('express').Router();
const { createBooking, getMyBookings } = require('../controllers/bookingController');
const { authenticate } = require('../utils/authUtils');

router.use(authenticate) // Apply authenticate middleware to all routes in this file

// Authenticated API - Retrieve a user's existing bookings
router.get('/', getMyBookings);

// Authenticated API - Create a new booking
router.post('/', createBooking);


module.exports = router;
