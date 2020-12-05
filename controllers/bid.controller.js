const Bid = require('../models/bid.model');
const Product = require('../models/product.model');
const moment = require('moment');
// @bid/get_bids
// @ get all bids
// access authentic

const getBids = async (req, res) => {
  try {
    let bids = await Bid.find().populate('product');
    return res.status(200).json(bids);
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
    let product = await Product.findOne({ _id: productId });

    // get inputs from user
    const { biddingFee, initialBiddingPrice } = req.body;

    // specify details about product in announcement
    let announcementDetail = {
      product: product,
      biddingFee,
      initialBiddingPrice,
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
  // get product Id from the parameter
  let id = req.params.productId;

  //generate random number for the bid
  let bid_no = 'BID-' + Math.ceil(Math.random() * 10000);

  try {
    const {
      startingDate,
      biddingFee,
      initialBiddingPrice,
      biddingInterval,
    } = req.body;

    //check if the product already opened for bid
    // let product = await Product.findOne({ _id: id });

    let abid = await Bid.findOne({ product: id }).populate('product');

    if (abid != null) {
      return res.status(400).json({
        message: `Product ${id} is already on bid`,
        success: false,
      });
    }

    // check if bid number is taked
    let bid_by_no = await Bid.findOne({ bidNo: bid_no });
    if (bid_by_no != null) {
      res.status(400).json({
        message: `bid number already taked,please send request again`,
        success: false,
      });
    }

    // create new bid object
    let bid = new Bid({
      bidNo: bid_no,
      biddingFee,
      product: id,
      initialBiddingPrice,
      startingDate: moment(startingDate).valueOf(),
      closingDate: moment(startingDate).add(biddingInterval, 'hours').valueOf(),
      biddingInterval,
    });


    //save new bid
    let data = await bid.save();
    //respond to the client
    return res.status(201).json({
      data,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'unable to create a bid',
      err,
    });
  }
};

// @ bid/bid_product
// @ bidding fee should be confirmed or subtracted from bidder account
// @ access authentic

const bidProduct = async (req, res) => {
  try {
    const id = req.params.bidId;
    // const { biddingFee } = req.body;
    // let userDetails = req.user;
    let userDetails = req.user;
    await Bid.findOneAndUpdate(
      { _id: id },

      {
        $push: {
          bidders: {
            bidder: userDetails.user_id,
            offer: req.body.offer, // modified the bid with their respective offer
          },
        },
      },
      { new: true, useFindAndModify: false }
    );

    return res.status(201).json({
      message: 'Bid for product successfull',
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

// @ bid/get_a_bid
// @ get a bid that have many bidders
// @ access authentic
const getBid = async (req, res) => {
  try {
    const bid_no = req.params.bidNo;
    const bid = await Bid.findOne({ bidNo: bid_no }).populate(
      'bidders.bidder',
      '-password -__v'
    );

    let sortOffer = bid.bidders.sort((a, b) => b.offer - a.offer);

    return res.status(200).json({
      bid: sortOffer,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
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

const closeBids = async () => {
  try {
    let toBeClosed = [];
    let bids = await Bid.find();

    console.log(bids);
    if (bids.length == 0) return;

    bids.forEach((_bid) => {
      if (moment(_bid.closingDate).isBefore(moment())) {
        toBeClosed.push(_bid._id);
      } else {
        //Do nothing
      }
    });

    if (toBeClosed != []) {
      var bulk = People.collection.initializeOrderedBulkOp();
      bulk
        .find({ _id: { $in: toBeClosed } })
        .update({ $set: { status: 'closed' } });
      bulk.execute((err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(' Bids ', toBeClosed, ' Closed Successfully');
        }
      });
    }
  } catch (err) {
    console.log('error while closing bids ');
  }
};

module.exports = {
  getBids,
  announceBid,
  openBid,
  closeBid,
  bidProduct,
  getBid,
  closeBids,
};
