const mongoose = require('mongoose');
let Product = require('../models/product.model');

// @product/display /see
// @ show product
// access Public

exports.get_products = async (req,res) => {
    try {
        const product = await Product.find();
        return res.status(200).json(
            {
                success:true,
                message:"data found",
                product:product
            });
    } catch (error) {
        const messages = Object.values(error.errors).map(
          value => value.message
        );
        return res.status(500).json({
          message: "unable to find data",
          error: messages
        });
    }
}

// @product/insert
// @ post product
// access authentic
exports.post_product = async (req, res) => {
    try {
        const { cropType, amount, cropGrade, region, fertilizer } = req.body;
        const product = await Product.create(req.body);
        return res.status(201).json({
            sucess: true,
            data: product
        });
    } catch (error) {
         const messages = Object.values(error.errors).map(
           value => value.message
         );
         return res.status(500).json({
           message: "unable to store data",
           error: messages
         });
    }
}