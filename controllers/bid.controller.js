const moment = require("moment");
const Bid = require("../models/bid.model");
//const User = require("../models/user.model");

exports.createBid = async (req, res, next) => {
  try {
    let bidder = req.userData.user_id;       
    let new_bid = new Bid({
      productName: req.body.productName,
      initialFee: req.body.initialFee,
      description: req.body.description,
      startingBidPrice: req.body.startingBidPrice,
      bidStart: moment(req.body.bidStart).format(
        'MMMM Do YYYY, h:mm:ss a'
      ),
      bidEnd: moment(req.body.bidEnd).format(
        'MMMM Do YYYY, h:mm:ss a'
      ),
      bidNo: req.body.bidNo,
     // postedBy
       bidder,
      // image: req.file.path
    });

    let result = await new_bid.save();
    res.status(200).json(result);
    //next();
  } catch (err) {
    return res.status(400).json({
      error: "Bid not added"
    });
  }

}


exports.getBids = async (req, res, next) => {
  try {
    let bid = await Bid.find()
      //.populate("bidder")
      //.populate("bidder", "fullname");
    if (!bid) {
      return res.status(400).json({
        error: "Bid not found"
      });
    }
    return res.status(200).json({
      success: true,
      bids: bid
    });

  } catch (err) {
    return res.status(400).json({
      error: "Could not get bids"
    });
  }

}


exports.listOpenBid = async (req, res, next) => {
  try {
    let auction = await Bid.find({ bidEnd: { $gt: new Date() } })
      .sort("bidStart")
      .populate("postedBy", "_id warehouse_code")
      .populate("bidder", "_id fullname")
    res.json(auction);

  }
  catch (err) {
    return res.status(400).json({
      error: "Error while geting open bids"
    });

  }
}