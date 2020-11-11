const express = require('express');
const bidRouter = express.Router();

const {
  getBids,
  announceBid,
  openBid,
  closeBid,
} = require('../controllers/bid.controller');

/**
 * get the bid that have been made
 */
bidRouter.get('/get_bids', async () => {
  await getBids();
});

/**
 * announce bid
 */
bidRouter.post('/announce_bid/:productId', async () => {
  await announceBid();
});
/**
 * open a bid
 */
bidRouter.post('/create_bid/:productId', async () => await openBid());

/**
 * closed the bid which have a winner
 */
bidRouter.delete('/close_bid/:bidId', async () => await closeBid());

module.exports = bidRouter;
