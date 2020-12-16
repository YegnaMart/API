const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  productName: {
    type: String,
    enum:["Maize", "Barley", "Wheat", "Teff", "Coffee"],
    required: true,
  },
  category: {
    type: String,
    required: false,
  },
  amount: {
    type: Number,
    required: true,
  },
  regionOfOrigin: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  productImage: {
    type: String,
    required: false,
  },

  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isPurchased: {
    type: Boolean,
    default: false,
  },
});

module.exports = model('Product', productSchema);
