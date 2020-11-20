const { Schema, model } = require("mongoose");

const deliverySchema = new Schema({
  deliveryId: {
    type: Schema.Types.ObjectId,
    ref: "User",

  },
  quintal_per_km: {
    type: Number,
    required: true
  },

  pick_up_loc: {
    type: Schema.Types.ObjectId,
    ref: "Location"
  },
  drop_off_loc: {
    type: Schema.Types.ObjectId,
    ref: "Location"

  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"

  },

}, { timestamps: true });

module.exports = model("Delivery", deliverySchema);