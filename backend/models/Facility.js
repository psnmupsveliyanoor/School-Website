const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    nameMl: { type: String, default: '' },
    description: {
      type: String,
      default: '',
    },
    descriptionMl: { type: String, default: '' },
    imageUrl: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '🏫',
    },
    tag: {
      type: String,
      default: 'Facility',
      trim: true,
    },
    tagMl: { type: String, default: '' },
    shortDescription: {
      type: String,
      default: '',
    },
    shortDescriptionMl: { type: String, default: '' },
    longDescription: {
      type: String,
      default: '',
    },
    longDescriptionMl: { type: String, default: '' },
    bullets: {
      type: [String],
      default: [],
    },
    bulletsMl: { type: [String], default: [] },
    accent: {
      type: String,
      default: 'linear-gradient(90deg,#2563EB,#3B82F6)',
    },
    glow: {
      type: String,
      default: 'rgba(37,99,235,0.10)',
    },
    iconBg: {
      type: String,
      default: 'rgba(37,99,235,0.10)',
    },
    tagColor: {
      type: String,
      default: '#2563EB',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Facility', facilitySchema);
