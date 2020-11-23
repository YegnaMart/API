const router = require("express").Router();
const checkAuth = require("../middlewares/check_auth");
const {checkRole} = require("../middlewares/check_role");
const {uploadImage} = require("../middlewares/uploadproductimage");
const BidController = require("../controllers/bid.controller");

router.post("/add-bids",
uploadImage.single('productImage'),
BidController.createBid);

router.get("/get_bids",
BidController.getBids
)

module.exports = router;