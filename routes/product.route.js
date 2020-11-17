const router = require("express").Router();
const checkAuth = require("../middlewares/check_auth");
const {checkRole} = require("../middlewares/check_role");
const {uploadImage} = require("../middlewares/uploadImage");
const ProductController = require("../controllers/product.controller");

router.post("/uploadproduct",
uploadImage.single('productImage'),
ProductController.postProduct);

module.exports = router;