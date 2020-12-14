const { Schema, model } = require('mongoose');
const locationSchema = require('./location.model');
const userSchema = new Schema({
  fullName: {
    type: String,
  },
  firebaseUid: {
    type: String,
  },
  phoneNo: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: 'Farmer',
    enum: [
      'Farmer',
      'DeliveryPersonnel',
      'Admin',
      'Consumer',
      'StockManager',
      'DeliveryAgent',
      'Bidders',
    ],
  },
  location: {
    type: locationSchema,
  },
  deliveryHistory: [
    {
      delivery: {
        type: Schema.Types.ObjectId,
        ref: 'Delivery',
      },
    },
  ],
});

module.exports = model('User', userSchema);
