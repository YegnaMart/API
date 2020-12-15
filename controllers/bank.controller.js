const Bank = require('../models/bankAccount.model');
const Transaction = require('../models/transaction.model');
const Bid = require('../models/bid.model');

const addBankAccount = async (_userId) => {
  console.log(_userId);
  try {
    let user = await Bank.findOne({ userId: _userId });
    if (user) {
      return {
        message: `user already have an account`,
        success: false,
      };
    } else {
      let newAccount = new Bank({
        userId: _userId,
        accountNo: randomInteger(9999, 9999999),
      });

      let account = await newAccount.save();
      //respond to the client
      return {
        account,
        success: true,
      };
    }
  } catch (error) {
    return {
      message: 'unable to register new bank account user',
      error,
    };
  }
};

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const doTransaction = async (req) => {
  const { creditedAccountUserId, debitedAccountUserId, amount, bidId } = req;

  try {
    let bid = await Bid.findOne({ _id: bidId });

    if (!bid) {
      return {
        message: `bid  doesn't exist`,
        success: false,
      };
    } else {
      console.log(debitedAccountUserId);
      let accountHolder = await Bank.findOne({ userId: debitedAccountUserId });
      console.log(accountHolder);
      let previousTransaction = await Transaction.findOne({
        bidId: bidId,
      });

      if (previousTransaction) {
        return {
          message: `Transaction has been processed before for provided Bid`,
          success: false,
        };
      } else {
        let creditedAccountHolder = await Bank.findOne({
          userId: creditedAccountUserId,
        });

        if (amount > accountHolder.balance) {
          res.status(401).json({
            message: `You don't have sufficient amount to transaction`,
            success: false,
          });
        } else {
          let transact = new Transaction({
            bidId: bidId,
            amount,
            senderId: debitedAccountUserId,
            receiverId: creditedAccountUserId,
          });

          let transaction = await transact.save();

          let amountAfterTransaction = accountHolder.balance - amount;
          let debitedData = await Bank.findByIdAndUpdate(
            { _id: accountHolder._id },
            {
              balance: amountAfterTransaction,
              $push: {
                history: transaction._id,
              },
            }
          );

          let amountAfterCreditedTransaction =
            creditedAccountHolder.balance + amount;

          let creditedData = await Bank.findByIdAndUpdate(
            { _id: creditedAccountHolder._id },
            {
              balance: amountAfterCreditedTransaction,
              $push: {
                history: transaction._id,
              },
            }
          );

          return {
            message: `transaction processed successfully`,
            debitedData,
            creditedData,
            success: true,
          };
        }
      }
    }
  } catch (err) {
    return {
      message: `unable to complete transaction`,
      success: false,
      err,
    };
  }
};

const getAccount = async (req, res) => {
  const { accountNo } = req.body;

  try {
    let account = await Bank.findOne({ accountNo: accountNo });

    res.status(200).json({
      account,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      account,
      success: false,
      message: 'Unable to Query account',
    });
  }
};
module.exports = {
  addBankAccount,
  doTransaction,
  getAccount,
};
