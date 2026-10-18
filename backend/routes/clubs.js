const express = require('express');
const router = express.Router();
const Club = require('../models/Club');
const { protect } = require('../middleware/auth');

// @route  GET /api/clubs
// @desc   Get all clubs (sorted by order)
// @access Public
router.get('/', async (req, res) => {
  try {
    const clubs = await Club.find().sort({ order: 1, name: 1 });
    res.json(clubs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route  GET /api/clubs/:id
// @desc   Get single club
// @access Public
router.get('/:id', async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) return res.status(404).json({ message: 'Club not found' });
    res.json(club);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route  POST /api/clubs
// @desc   Create club
// @access Private
router.post('/', protect, async (req, res) => {
  try {
    const { name, description, icon, category, order } = req.body;
    const club = new Club({ name, description, icon, category, order: order || 0 });
    await club.save();
    res.status(201).json(club);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route  PUT /api/clubs/:id
// @desc   Update club
// @access Private
router.put('/:id', protect, async (req, res) => {
  try {
    const club = await Club.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!club) return res.status(404).json({ message: 'Club not found' });
    res.json(club);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route  DELETE /api/clubs/:id
// @desc   Delete club
// @access Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const club = await Club.findByIdAndDelete(req.params.id);
    if (!club) return res.status(404).json({ message: 'Club not found' });
    res.json({ message: 'Club deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
