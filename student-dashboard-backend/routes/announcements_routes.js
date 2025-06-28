const express = require('express');
const router = express.Router();
const Announcement = require('../models/announcement_model');


router.get('/', async (req, res) => {
  const data = await Announcement.find();
  res.status(200).json(data);
});


router.post('/', async (req, res) => {
  try {
    const newAnn = new Announcement(req.body);
    await newAnn.save();
    res.status(201).json(newAnn);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const updated = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
