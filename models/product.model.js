const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    cropType: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        default:1
    },
    cropGrade: {
        type: String,
        required: true,
        default: 'A'
    },
    region: {
        type: String,
        required: true
    },
    fertilizer: {
        type: String,
        required: true,
        default:'Nothing'
    }
});

module.exports = mongoose.model('Product',productSchema);