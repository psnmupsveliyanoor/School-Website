const express = require('express');
const router = express.Router();
const Facility = require('../models/Facility');
const { protect } = require('../middleware/auth');

// @route  GET /api/facilities
// @desc   Get all facilities
// @access Public
router.get('/', async (req, res) => {
  try {
    const facilities = await Facility.find().sort({ order: 1, name: 1 });
    res.json(facilities);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route  GET /api/facilities/:id
// @desc   Get single facility
// @access Public
router.get('/:id', async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);
    if (!facility) return res.status(404).json({ message: 'Facility not found' });
    res.json(facility);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route  POST /api/facilities
// @desc   Create facility
// @access Private
router.post('/', protect, async (req, res) => {
  try {
    const {
      name, nameMl, description, descriptionMl, imageUrl, icon, tag, tagMl,
      shortDescription, shortDescriptionMl, longDescription, longDescriptionMl, bullets, bulletsMl,
      accent, glow, iconBg, tagColor, order,
    } = req.body;

    // bullets can be sent as an array or as a comma-separated string
    const bulletsArray = Array.isArray(bullets)
      ? bullets
      : typeof bullets === 'string' && bullets.trim()
        ? bullets.split('\n').map((b) => b.trim()).filter(Boolean)
        : [];
    const bulletsMlArray = Array.isArray(bulletsMl)
      ? bulletsMl
      : typeof bulletsMl === 'string' && bulletsMl.trim()
        ? bulletsMl.split('\n').map((b) => b.trim()).filter(Boolean)
        : [];

    const facility = new Facility({
      name, nameMl, description, descriptionMl, imageUrl, icon, tag, tagMl,
      shortDescription, shortDescriptionMl, longDescription, longDescriptionMl,
      bullets: bulletsArray, bulletsMl: bulletsMlArray,
      accent, glow, iconBg, tagColor, order: order || 0,
    });
    await facility.save();
    res.status(201).json(facility);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route  PUT /api/facilities/:id
// @desc   Update facility
// @access Private
router.put('/:id', protect, async (req, res) => {
  try {
    // Handle bullets string → array conversion
    if (typeof req.body.bullets === 'string') {
      req.body.bullets = req.body.bullets
        .split('\n')
        .map((b) => b.trim())
        .filter(Boolean);
    }

    const facility = await Facility.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!facility) return res.status(404).json({ message: 'Facility not found' });
    res.json(facility);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route  DELETE /api/facilities/:id
// @desc   Delete facility
// @access Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const facility = await Facility.findByIdAndDelete(req.params.id);
    if (!facility) return res.status(404).json({ message: 'Facility not found' });
    res.json({ message: 'Facility deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
