const { Schema, model } = require('mongoose');
const orderSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'the Product to be order should be specified'],
  },
  description: {
    type: String,
    required: true,
    min: [50, 'the product order needs clear specification'],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('Order', orderSchema);
