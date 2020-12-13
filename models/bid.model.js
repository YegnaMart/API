  
const { Schema, model } = require('mongoose');
const moment = require('moment');

const bidSchema = new Schema({
  bidNo: {
    type: String,
    required: true,
  },
  biddingFee: {
    type: Number,
    required: [true, 'You should pay the un returnable fee to bid'],
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  initialBiddingPrice: {
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
  biddingInterval: {
    type: Number,
    required: false,
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'Warehouse',
  },
  status: {
    type: String,
    enum: ['opened', 'closed', 'scheduled', 'inactive'],
    default: 'inactive',
  },
  bidders: [
    {
      offer: Number,
      bidder: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
});

module.exports = model('Bid', bidSchema);