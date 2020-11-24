const Product = require("../models/product.model");
const Order = require("../models/order.model");


exports.postProduct = async (req, res) => {
    try {
       ;
        const product = new Product({
            productName: req.body.productName,
            category: req.body.category,
            quantity: req.body.quantity,
            regionOfOrign: req.body.regionOfOrign,
            price: req.body.price,
            productGrade:req.body.productGrade,
            description: req.body.description,
            productImage: req.file.path,
            //the usermuset be logged in user

        });
        const newProduct = await product.save();
        return res.status(201).json({
            message: "product added successfully",
            ...newProduct
        });
    } catch (err) {
        return res.status(500).json({
            err:" Something goes wrong"
        });

    }
}

exports.oderProduct = async(req,res,next)=>{


}
