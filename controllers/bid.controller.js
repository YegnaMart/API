const Bid = require('../models/bid.model');
const Product = require('../models/product.model');
const moment = require('moment');
// @bid/get_bids
// @ get all bids
// access authentic

const getBids = async (req, res) => {
  try {
    let bids = await Bid.find();
    return res.status(200).json(bids[1]);
  } catch (error) {
    console.log(error);
  }
};

// @ bid/announce_bid
// @ announce when the bid will be held
// @ access stock managers or farmers
const announceBid = async (req, res) => {
  try {
    //get product id
    let productId = req.params.productId;
    console.log(productId);
    let product = await Product.findById(productId);

    // specify details about product in announcement
    let date = new Date().getTime();
    let announcementDetail = {
      _id: product._id,
      productName: product.cropType,
      region: product.region,
      amount: product.amount,
      grade: product.cropGrade,
      fertilizer: product.fertilizer,
      openingDate: moment(req.body.openingDate).format('YYYY/MM/DD'),
      closingDate: moment(req.body.closingDate).format('YYYY/MM/DD'),
    };

    // close if the closing date is today
    if (announcementDetail.closingDate === moment().format('YYYY/MM/DD')) {
      await Product.findOneAndDelete({ productId });
      res.status(200).json({
        message: 'bid announcement successfully deleted',
        success: true,
      });
    }

    return res.status(200).json({
      announcementDetail,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: 'unable to open a bid',
      err: error,
    });
  }
};

// @ bid/create_bid
// @ create/open a bid
// @ access authentic/private
const openBid = async (req, res) => {
  let id = req.params.productId;
  try {
    let product = await Product.findById(id);
    let bid = new Bid({
      initialFee: req.body.initialFee,
      product: product._id,
      biddingPrice: req.body.biddingPrice,
      closingDate: moment(req.body.closingDate).format(
        'MMMM Do YYYY, h:mm:ss a'
      ),
    });

    bid
      .save()
      .then((result) => {
        res.status(201).json({
          success: true,
          data: result,
        });
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  } catch (error) {
    const messages = Object.values(error.errors).map((value) => value.message);
    return res.status(500).json({
      message: 'unable to signup',
      error: messages,
    });
  }
};

// @ bid/close_bid
// @ close expired bids
// @ access authentic

const closeBid = async (req, res) => {
  let id = req.params.bidId;
  try {
    let deletedBid = await Bid.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: 'bid deleted',
      data: deletedBid,
    });
  } catch (error) {
    const messages = Object.values(error.errors).map((value) => value.message);
    return res.status(404).json({
      message: 'unable to delete bid',
      error: messages,
    });
  }
};

module.exports = {
  getBids,
  announceBid,
  openBid,
  closeBid,
};
