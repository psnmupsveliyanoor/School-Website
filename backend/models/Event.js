const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    titleMl: { type: String, default: '' },
    date: {
      type: Date,
      default: null,
    },
    location: {
      type: String,
      default:"",
    },
    locationMl: { type: String, default: '' },
    description: {
      type: String,
      default:"",
    },
    descriptionMl: { type: String, default: '' },
    imageUrl: {
      type: String,
      default: 'https://placehold.co/800x500?text=Event+Image',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
