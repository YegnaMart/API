const { Schema, model } = require("mongoose");

const locationSchema = new Schema({
   location:{
      type:String,
      required:true
   },

  Coordinates:[{
   longitude: {
      type: Number,
      required: true
   },
   latitude: {
      type: Number,
      required: true
   }
}]
}, { timestamps: true });

module.exports = model("Location", locationSchema);