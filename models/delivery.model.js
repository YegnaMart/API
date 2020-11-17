const { Schema, model } = require('mongoose');

const deliveySchema = new Schema(
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
  },
  { timestamps: true }
);

module.exports = model('Delivery', deliveySchema);
