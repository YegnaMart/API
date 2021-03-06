const { Schema, model } = require('mongoose');

const warehouseSchema = new Schema({
  warehouse_code: {
    type: String,
    default: 'AAW-001',
  },
  placeName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required:true ,
  },
  region: {
    type: String,
    required: true,
  },
  storage_capacity: {
    type: Number,
    required: true,
  },
});

module.exports = model('Warehouse', warehouseSchema);
