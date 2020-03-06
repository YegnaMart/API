const express = require('express');
const bidRouter = express.Router();

const {get_bids, create_a_bid, delete_a_bid} = require('../controllers/bid.controller')


bidRouter.route('/get_bids').get(get_bids);
bidRouter.route('/create_bid').post(create_a_bid);
bidRouter.route('/delete_bid').delete(delete_a_bid);

module.exports = bidRouter;