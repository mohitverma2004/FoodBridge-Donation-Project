const express = require('express');
const router = express.Router();
const Request = require('../models/Request');

router.post('/', async (req, res) => {
  const { orgName, location } = req.body;
  const request = new Request({ orgName, location });
  await request.save();
  res.json({ message: 'Request submitted!' });
});

router.get('/', async (req, res) => {
  const requests = await Request.find();
  res.json(requests);
});

module.exports = router;
