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
  },
  { timestamps: true }
);

module.exports = model('Delivery', deliverySchema);
