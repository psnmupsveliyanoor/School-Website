const express = require('express');
const multer = require('multer');
const { protect } = require('../middleware/auth');
const { uploadBuffer } = require('../lib/cloudinary');

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    if (file.mimetype.startsWith('image/')) return callback(null, true);
    callback(new Error('Only image files are allowed'));
  },
});

router.post('/image', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No image uploaded' });

    const result = await uploadBuffer(req.file.buffer, { folder: 'school-website' });
    res.status(201).json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    res.status(500).json({ message: `Image upload failed: ${error.message}` });
  }
});

module.exports = router;
