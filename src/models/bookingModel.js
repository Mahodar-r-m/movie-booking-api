const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  show: { type: mongoose.Schema.Types.ObjectId, ref: 'Show', required: true },
  timing: { type: String, required: true },
  seats: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  totalCost: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model('Booking', bookingSchema, 'bookings');

module.exports = Booking;
