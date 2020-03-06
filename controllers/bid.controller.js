const Bid = require("../models/bid.model");
const Product = require("../models/product.model");

// @bid/get_bids
// @ get all bids
// access authentic

exports.get_bids = async (req, res) => {
  try {
    let bids = await Bid.find()
      .populate("product")
      .sort({ biddingPrice: -1 });
    res.status(200).json({
      success: true,
      data: bids
    });
  } catch (error) {
    const messages = Object.values(error.errors).map(value => value.message);
    return res.status(500).json({
      message: "unable to signup",
      error: messages
    });
  }
};


// @ bid/create_bid
// @ create/open a bid
// @ access authentic/private
exports.create_a_bid = async (req, res) => {
  let id = req.params.productId;
  try {
    let product = await Product.findById(id);
    let bid = new Bid({
      initialFee: req.body.initialFee,
      product: product._id,
      biddingPrice: req.body.biddingPrice,
      closingDate: req.body.closingDate
    });

    let result = bid.save();
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    const messages = Object.values(error.errors).map(value => value.message);
    return res.status(500).json({
      message: "unable to signup",
      error: messages
    });
  }
};

// @ bid/delete_bid
// @ delete expired bids
// @ access authentic

exports.delete_a_bid = async (req, res) => {
  let id = req.params.bidId;
  try {
    let deletedBid = await Bid.findByIdAndDelete(id);
    res.status(200).json({
        success: true,
        data: deletedBid
    });
  } catch (error) {
      const messages = Object.values(error.errors).map(value => value.message);
      return res.status(500).json({
        message: "unable to signup",
        error: messages
      });
  }
};
