const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  orgName: String,
  location: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Request', RequestSchema);
