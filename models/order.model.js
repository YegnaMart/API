const { Schema, model } = require('mongoose');
const orderSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    min: [50, 'the product order needs clear specification'],
  },
  date: {
    type: String,
    default: Date.now,
    required: true,
  },
});

module.exports = model('Order', orderSchema);
