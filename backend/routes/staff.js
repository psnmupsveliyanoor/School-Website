const express = require('express');
const router = express.Router();
const Staff = require('../models/Staff');
const { protect } = require('../middleware/auth');

// @route  GET /api/staff
// @desc   Get all staff
// @access Public
router.get('/', async (req, res) => {
  try {
    const staff = await Staff.find().sort({ name: 1 });
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route  GET /api/staff/:id
// @desc   Get single staff member
// @access Public
router.get('/:id', async (req, res) => {
  try {
    const member = await Staff.findById(req.params.id);
    if (!member) return res.status(404).json({ message: 'Staff member not found' });
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route  POST /api/staff
// @desc   Create staff member
// @access Private
router.post('/', protect, async (req, res) => {
  try {
    const { name, nameMl, role, roleMl, department, departmentMl, bio, bioMl, imageUrl } = req.body;
    const member = new Staff({ name, nameMl, role, roleMl, department, departmentMl, bio, bioMl, imageUrl });
    await member.save();
    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route  PUT /api/staff/:id
// @desc   Update staff member
// @access Private
router.put('/:id', protect, async (req, res) => {
  try {
    const member = await Staff.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!member) return res.status(404).json({ message: 'Staff member not found' });
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route  DELETE /api/staff/:id
// @desc   Delete staff member
// @access Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const member = await Staff.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ message: 'Staff member not found' });
    res.json({ message: 'Staff member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
