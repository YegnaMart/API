const { Schema, model } = require('mongoose');
const moment = require('moment');

const bidSchema = new Schema({
  initialFee: {
    type: Number,
    required: [true, 'You should pay the un returnable fee to bid'],
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  biddingPrice: {
    type: Number,
    required: true,
  },
  startingDate: {
    type: String,
    default: moment(new Date()).format('Do MMMM, YYYY [at] h:mm a'),
  },
  closingDate: {
    type: String,
    required: true,
  },
});

module.exports = model('Bid', bidSchema);