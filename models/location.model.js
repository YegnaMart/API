const { Schema, model } = require('mongoose');

exports.locationSchema = new Schema({
  name: {
    type: String,
  },
  placeName: {
    type: String,
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});
