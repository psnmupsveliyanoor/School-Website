const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema(
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
    icon: {
      type: String,
      default: '🎭',
    },
    category: {
      type: String,
      enum: ['main', 'sub'],
      default: 'sub',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Club', clubSchema);
