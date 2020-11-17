//const Product = require("../models/product.model");
//const User = require("../models/user.model");
const Bid = require("../models/bid.model");
const fs = require("fs");
const path = require("path");
const formidable = require("formidable");


exports.createBid = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(400).json({
          message: "Image could not be uploaded"
        })
      }
      //fields are incomming form data
      let bid = new Bid(fields)
      bid.warehouse = req.profile
      if(files.image){
        bid.image.data = fs.readFileSync(files.image.path)
        bid.image.contentType = files.image.type
      }
      try {
        let result = await Bid.save()
        res.status(200).json(result)
      }catch (err){
        return res.status(400).json({
          error:"There is an error in posting bids"
        })
      }
    })
  }