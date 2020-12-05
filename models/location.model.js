const { Schema, model } = require("mongoose");

const locationSchema = new Schema({

   placeName: {
      type: String
   },
   longitude: {
      type: Number,
      required: true
   },
   latitude: {
      type: Number,
      required: true
   }

}, { timestamps: true });

module.exports = model("Location", locationSchema);