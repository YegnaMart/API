const { Schema, model } = require('mongoose');
const { locationSchema } = require('./location.model');

const deliverySchema = new Schema(
  {
    deliveryId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    pickup_Location: {
      type: locationSchema,
    },
    dropoff_Location: {
      type: locationSchema,
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
