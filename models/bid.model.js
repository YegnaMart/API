const mongoose = require('mongoose');
const bidSchema = mongoose.Schema({
    initialFee: {
        type: Number,
        required: [true, 'You should pay the un returnable fee to bid']
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    biddingPrice: {
        type: Number,
        required: true
    },
    startingDate: {
        type: Date,
        default: Date.now
    },
    closingDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Bid',bidSchema)