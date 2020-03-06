const express = require('express');
const orderRouter = express.Router();
const {get_orders, create_order} = require('../controllers/order.controller');

orderRouter.route('/get_orders').get(get_orders);
orderRouter.route(`/create_order/:productId`).post(create_order);
module.exports = orderRouter;