const { Schema, model } = require('mongoose');
const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: {
    type: String,
    required: true,
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
});

module.exports = model('User', userSchema);
