const { Schema, model } = require('mongoose');

const deliverySchema = new Schema(
  {
    deliveryId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    pickup_Location: {
      type: Schema.Types.ObjectId,
      ref: 'Warehouse',
    },
    dropoff_Location: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    quintal_per_km: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model('Delivery', deliverySchema);
