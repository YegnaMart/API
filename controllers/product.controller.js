const Product = require("../models/product.model");


exports.postProduct = async (req, res) => {
    try {
        const product = new Product({
            productname: req.body.productname,
            category: req.body.category,
            quantity: req.body.quantity,
            regionOfOrign: req.body.regionOfOrign,
            price: req.body.price,
            productGrade:req.body.productGrade,
            description: req.body.description,
            productImage: req.file.path,
            postedBy:req.params._id //the usermuset be logged in user

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


