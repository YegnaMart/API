const { Schema, model } = require('mongoose');

exports.locationSchema = new Schema({
  lat: {
    type: Number,
  },
  long: {
    type: Number,
  },
  placeName: {
    type: String,
  },
});
