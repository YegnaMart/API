const { Schema, model } = require('mongoose');

const locationSchema = new Schema({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  relativeLocation: {
    type: String,
    required: true,
  },
});

module.exports = model('Location', locationSchema);
