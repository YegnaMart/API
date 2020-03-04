const express = require('express');
const productRouter = express.Router();

const { get_products, post_product } = require('../controllers/product.controller');
const checkAuth  = require("../middleware/check-auth");


productRouter.route('/get_products').get(get_products);
productRouter.route('/post_product').post(checkAuth,post_product);

module.exports = productRouter