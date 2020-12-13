const { Schema, model } = require('mongoose');

const BankAccountSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  accountNo: {
    type: Number,
  },
  balance: {
    type: Number,
    required: true,
    default: 1000,
  },
  history: {
    type: [
      {
        transaction: {
          type: Schema.Types.ObjectId,
          ref: 'Transaction',
        },
      },
    ],
  },
});

module.exports = model('BankAccount', BankAccountSchema);