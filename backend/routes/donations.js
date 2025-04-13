const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');

router.post('/', async (req, res) => {
  const { donor, food, amount } = req.body;
  const donation = new Donation({ donor, food, amount });
  await donation.save();
  res.json({ message: 'Donation submitted!' });
});

router.get('/', async (req, res) => {
  const donations = await Donation.find();
  res.json(donations);
});

module.exports = router;
