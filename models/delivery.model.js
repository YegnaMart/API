const { Schema, model } = require("mongoose");
const Location  = require("./location.model");

const deliverySchema = new Schema({
  
  deliveryId: {
    type: Schema.Types.ObjectId,
    ref: "User",

  },

  pickup_location: {
    type: Location
  },
  dropoff_location: {
    type: Location

  },
  



}, { timestamps: true });

module.exports = model("Delivery", deliverySchema);