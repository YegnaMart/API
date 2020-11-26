const router = require("express").Router();
const checkAuth = require("../middlewares/check_auth");
const {checkRole} = require("../middlewares/check_role");
const {uploadImage} = require("../middlewares/uploadproductimage");
const ProductController = require("../controllers/product.controller");

router.post("/add_products",
uploadImage.single('productImage'),
ProductController.postProduct);

router.get("/get_products",
ProductController.getListOFProducts);

router.get("/get_product",
ProductController.getOneProduct);

router.put("/edit_product",
uploadImage.single('productImage'),
ProductController.editProducts);

router.delete("/delete_product",
ProductController.deleteProduct);

module.exports = router;