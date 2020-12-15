const express = require('express');
const bidRouter = express.Router();

const {
  getBids,
  announceBid,
  createBid,
  closeBid,
  bidProduct,
  getBid,
  bidCategory,
} = require('../controllers/bid.controller');

const { checkAuth } = require('../middleware/check-auth');
/**
 * get the bid that have been made
 */
bidRouter.get('/get_bids', getBids);

/**
 * announce bid
 */
bidRouter.post('/announce_bid', announceBid);
/**
 * open a bid
 */
bidRouter.post('/create_bid', createBid);

/**
 * Bid for product
 */

bidRouter.patch('/bid_product', checkAuth, bidProduct);

/**
 * get a bid with respective bidders
 */

bidRouter.post('/get_a_bid', getBid);

/**
 * categorize bid by status
 */

bidRouter.post('/bid_category', bidCategory);

/**
 * closed the bid which have a winner
 */
bidRouter.delete('/close_bid/:bidId', async () => await closeBid());

module.exports = bidRouter;
