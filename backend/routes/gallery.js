const express = require('express');
const router = express.Router();
const multer = require('multer');
const { google } = require('googleapis');
const Gallery = require('../models/Gallery');
const { protect } = require('../middleware/auth');
const { uploadBuffer, deleteAsset } = require('../lib/cloudinary');

// Multer Config (Stores the incoming file temporarily in memory buffer)
const upload = multer({ storage: multer.memoryStorage() });

// Switched from Service Account to OAuth2 Client Authentication
const getDriveClient = () => {
  const clientId = process.env.GOOGLE_DRIVE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_DRIVE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_DRIVE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Missing Google API credentials in backend environment config (.env)");
  }

  // Initialize OAuth2 client handler using your personal credentials
  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    'https://developers.google.com/oauthplayground' // This redirect URI must match your console setup exactly
  );

  // Bind your permanent refresh token to the client instance
  oauth2Client.setCredentials({
    refresh_token: refreshToken
  });

  return google.drive({ version: 'v3', auth: oauth2Client });
};

// @route   GET /api/gallery
// @desc    Get all gallery items
// @access  Public
router.get('/', async (req, res) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/gallery/:id
// @desc    Get single gallery item
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Gallery item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/gallery
// @desc    Upload image/video to Cloudinary and create MongoDB entry
// @access  Private
router.post('/', protect, upload.single('mediaFile'), async (req, res) => {
  try {
    const { title, titleMl, category, categoryMl, fileType } = req.body;
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const sanitizedType = fileType ? fileType.toLowerCase() : 'image';
    const resolvedFileType = ['video', 'mp4', 'mov', 'avi', 'webm'].includes(sanitizedType)
      ? 'video'
      : 'image';
    const uploadResult = await uploadBuffer(req.file.buffer, {
      folder: 'school-website/gallery',
      resource_type: 'auto',
    });

    const item = new Gallery({
      title: title || 'Untitled Event',
      titleMl: titleMl || '',
      category: category || 'General',
      categoryMl: categoryMl || '',
      imageUrl: uploadResult.secure_url,
      fileType: resolvedFileType,
      cloudinaryPublicId: uploadResult.public_id,
    });
    const savedItem = await item.save();
    return res.status(201).json(savedItem);
  } catch (error) {
    return res.status(500).json({ message: `Upload failed: ${error.message}` });
  }
});

// @route   PUT /api/gallery/:id
// @desc    Update text meta details of gallery item (Doesn't change the file)
// @access  Private
// @route   PUT /api/gallery/:id
// @desc    Update meta details and/or replace media file in Cloudinary & MongoDB
// @access  Private
// @route   PUT /api/gallery/:id
// @desc    Update meta details and/or replace image/video in Cloudinary & MongoDB
// @access  Private
router.put('/:id', protect, upload.single('mediaFile'), async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    const { title, titleMl, category, categoryMl, fileType } = req.body;

    // Retain current values unless a new file is uploaded
    let imageUrl = item.imageUrl;
    let cloudinaryPublicId = item.cloudinaryPublicId;
    let driveFileId = item.driveFileId;

    const sanitizedType = fileType ? fileType.toLowerCase() : item.fileType;
    const resolvedFileType = ['video', 'mp4', 'mov', 'avi', 'webm'].includes(sanitizedType)
      ? 'video'
      : 'image';

    // 1. If a new file is selected during edit
    if (req.file) {
      // Remove old image from Cloudinary or legacy Google Drive
      if (item.cloudinaryPublicId) {
        await deleteAsset(item.cloudinaryPublicId, item.fileType);
      } else if (item.driveFileId) {
        try {
          const drive = getDriveClient();
          await drive.files.delete({ fileId: item.driveFileId });
        } catch (driveErr) {
          console.warn('Legacy Drive asset removal skipped:', driveErr.message);
        }
        driveFileId = undefined; // Clear old drive pointer after cleanup
      }

      // Upload new binary buffer to Cloudinary
      const uploadResult = await uploadBuffer(req.file.buffer, {
        folder: 'school-website/gallery',
        resource_type: 'auto',
      });

      imageUrl = uploadResult.secure_url;
      cloudinaryPublicId = uploadResult.public_id;
    }

    // 2. Update MongoDB document properties
    item.title = title !== undefined ? title : item.title;
    item.titleMl = titleMl !== undefined ? titleMl : item.titleMl;
    item.category = category !== undefined ? category : item.category;
    item.categoryMl = categoryMl !== undefined ? categoryMl : item.categoryMl;
    item.fileType = resolvedFileType;
    item.imageUrl = imageUrl;
    item.cloudinaryPublicId = cloudinaryPublicId;
    item.driveFileId = driveFileId;

    const updatedItem = await item.save();
    return res.json(updatedItem);

  } catch (error) {
    console.error("PUT /api/gallery/:id error:", error);
    return res.status(500).json({ message: `Update failed: ${error.message}` });
  }
});

// @route   DELETE /api/gallery/:id
// @desc    Delete media file from Cloudinary and remove from MongoDB
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Gallery item not found' });

    if (item.cloudinaryPublicId) {
      await deleteAsset(item.cloudinaryPublicId, item.fileType);
    } else if (item.driveFileId) {
      // Keep legacy Google Drive records removable after the storage migration.
      const drive = getDriveClient();
      try {
        await drive.files.delete({ fileId: item.driveFileId });
      } catch (driveErr) {
        console.warn('Legacy Drive asset already removed manually:', driveErr.message);
      }
    }

    await Gallery.findByIdAndDelete(req.params.id);

    res.json({ message: 'Gallery item deleted successfully from website and Cloudinary' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;