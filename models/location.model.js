const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  relativeLocation: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Location", locationSchema);
