const { Schema, model } = require('mongoose');
const Location = require('./location.model');

const deliverySchema = new Schema(
  {
    deliveryId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    pickup_Location: {
      type: Location,
    },
    dropoff_Location: {
      type: Location,
    },
    quintal_per_km: {
      type: Number,
      required: true,
    },
    rate: {
      type: Number,
      default: 1,
      enum: [1, 2, 3, 4, 5],
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model('Delivery', deliverySchema);