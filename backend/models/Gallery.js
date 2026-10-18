const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    titleMl: { type: String, default: '' },
    category: {
      type: String,
      required: true,
    },
    categoryMl: { type: String, default: '' },
    imageUrl: {
      type: String,
      required: true,
    },
    // Tracks whether the uploaded file is an image or a video
    fileType: {
      type: String,
      enum: ['image', 'video'],
      default: 'image',
      required: true,
    },
    cloudinaryPublicId: {
      type: String,
    },
    driveFileId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Gallery', gallerySchema);