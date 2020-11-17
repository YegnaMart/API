const { Schema, model } = require('mongoose');

const vehicleSchema = new Schema(
  {
    deliveryId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    model: {
      type: String,
      required: true,
    },
    loadCapacity: {
      type: String,
      required: true,
    },

    plateNo: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Vehicle', vehicleSchema);
