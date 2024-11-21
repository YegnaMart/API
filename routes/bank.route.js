const bankRouter = require('express').Router();

const {
  getAccount,
  doTransaction,
  addBankAccount,
} = require('../controllers/bank.controller');

bankRouter.get('/get_account', getAccount);
bankRouter.post('/do_transaction', doTransaction);
bankRouter.post('/add_bank_account', addBankAccount);


module.exports = bankRouter