const { Schema, model } = require('mongoose');

const transactionSchema = new Schema({
  bidId: {
    type: Schema.Types.ObjectId,
    ref: 'Bid',
  },
  senderId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  amount: {
    type: Number,
    required: true,
  },
});

module.exports = model('Transaction', transactionSchema);