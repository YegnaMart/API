const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  cropType: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    default: 1,
  },
  cropGrade: {
    type: String,
    required: true,
    default: 'A',
  },
  region: {
    type: String,
    required: true,
  },
  fertilizer: {
    type: String,
    required: true,
    default: 'Nothing',
  },
});

module.exports = model('Product', productSchema);
