const { Schema } = require('mongoose');
const locationSchema = new Schema({
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

module.exports = {
  locationSchema,
};
