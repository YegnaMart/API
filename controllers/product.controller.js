const mongoose = require("mongoose");
let Product = require("../models/product.model");

// @product/display /see
// @ show product
// access Public

exports.get_products = async (req, res) => {
  try {
    const product = await Product.find();
    return res.status(200).json({
      productAmount: product.length,
      success: true,
      message: "data found",
      product: product
    });
  } catch (error) {
    const messages = Object.values(error.errors).map(value => value.message);
    return res.status(500).json({
      message: "unable to find data",
      error: messages
    });
  }
};

// @product/post_product
// @ post product
// access authentic/must login to their account
exports.post_product = async (req, res) => {
  try {
    const { cropType, amount, cropGrade, region, fertilizer } = req.body;
    const product = await Product.create(req.body);
    return res.status(201).json({
      sucess: true,
      data: product
    });
  } catch (error) {
    const messages = Object.values(error.errors).map(value => value.message);
    return res.status(500).json({
      message: "unable to store data",
      error: messages
    });
  }
};

// @product/edit_product
// @ update product
// access authentic

exports.edit_product = async (req, res) => {
  try {
    const id = req.params.product_id;
    const { cropType, amount, cropGrade, region, fertilizer } = req.body;
    const singleProduct = await Product.findByIdAndUpdate(id, {
      $set: {
        cropType: req.body.cropType,
        amount:req.body.amount,
        cropGrade: req.body.cropGrade,
        region: req.body.region,
        fertilizer: req.body.fertilizer
      }
    }).then(result => {
        res.status(201).json({
            success: true,
            updateProduct: result
        });
    }).catch(err => {
        res.status(404).json({
            success: false,
            message: `unable to update product with id: ${id}`,
            error: err
        });
    });
  } catch (error) {
    const messages = Object.values(error.errors).map(value => value.message);
    return res.status(500).json({
      message: "unable to store data",
      error: messages
    });
  }
};
