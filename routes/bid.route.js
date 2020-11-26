const express = require('express');
const bidRouter = express.Router();

const {
  getBids,
  announceBid,
  openBid,
  closeBid,
  bidProduct,
  getBid,
} = require('../controllers/bid.controller');

const { checkAuth } = require('../middleware/check-auth');
/**
 * get the bid that have been made
 */
bidRouter.get('/get_bids', getBids);

/**
 * announce bid
 */
bidRouter.post('/announce_bid/:productId', announceBid);
/**
 * open a bid
 */
bidRouter.post('/create_bid/:productId', openBid);

/**
 * Bid for product
 */

bidRouter.patch('/bid_product/:bidId', checkAuth, bidProduct);

/**
 * get a bid with respective bidders
 */

bidRouter.get('/get_a_bid/:bidNo', getBid);

/**
 * closed the bid which have a winner
 */
bidRouter.delete('/close_bid/:bidId', async () => await closeBid());

module.exports = bidRouter;
