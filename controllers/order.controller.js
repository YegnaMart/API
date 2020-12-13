const mongoose = require('mongoose');
const Order = require('../models/order.model');
const Product = require('../models/product.model');

// @ order/get_orders
// @ get all orders by users
// access authentic

exports.get_orders = async (req, res) => {
  try {
    let order = await Order.find().populate('product');
    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    const messages = Object.values(error.errors).map((value) => value.message);
    return res.status(500).json({
      message: 'unable to find orders.',
      error: messages,
    });
  }
};

// @order/create_order/:productId (the id of product to be ordered)
// @ order product
// access authentic

exports.create_order = async (req, res) => {
  let id = req.params.productId;
  const { productName, amount, description, date } = req.body;
  try {
    let order = new Order({
      productName,
      amount,
      description,
      date,
    });
    order
      .save()
      .then((result) => {
        res.status(201).json({
          success: true,
          message: 'order created',
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: 'unable to create order',
          error: err,
        });
      });
  } catch (error) {
    const messages = Object.values(error.errors).map((value) => value.message);
    return res.status(500).json({
      message: 'unable to store data',
      error: messages,
    });
  }
};
