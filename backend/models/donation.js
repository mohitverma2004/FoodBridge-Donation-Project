const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
  donor: String,
  food: String,
  amount: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Donation', DonationSchema);
