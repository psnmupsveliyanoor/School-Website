const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    nameMl: { type: String, default: '' },
    role: {
      type: String,
      required: true,
    },
    roleMl: { type: String, default: '' },
    department: {
      type: String,
      required: true,
    },
    departmentMl: { type: String, default: '' },
    bio: {
      type: String,
      required: true,
    },
    bioMl: { type: String, default: '' },
    imageUrl: {
      type: String,
      default: 'https://placehold.co/300x300?text=Staff+Photo',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Staff', staffSchema);
