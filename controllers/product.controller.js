const Product = require("../models/product.model");
const Order = require("../models/order.model");


exports.postProduct = async (req, res) => {
    try {
        //const postedBy = req.userData.user_id;
        const product = new Product({
            productName: req.body.productName,
            category: req.body.category,
            quantity: req.body.quantity,
            regionOfOrign: req.body.regionOfOrign,
            price: req.body.price,
            productGrade:req.body.productGrade,
            description: req.body.description,
            productImage: req.file.path,
            //postedBy
            //the usermuset be logged in user

        });
        let newProduct = await product.save();
        return res.status(201).json({
            message: "product added successfully",
            posts:newProduct
        });
    } catch (err) {
        return res.status(500).json({
            err:" Something goes wrong"
        });

    }
}
exports.getListOFProducts = async (req, res, next) => {
    try {
        let products = await Product.find()
        //.populate("orderedBy")

        if (!products) {
            return res.status(400).json({
                error: "product not  found"
            });
        }
        return res.status(200).json({
            success: true,
            newProduct: products
        });
    } catch (err) {
        return res.status(400).json({
            error: "Error in geting products"
        });
    }

};


//router.get("/:orderId", (req, res, next)

exports.getOneProduct = async (req, res, next) => {

    try {
        let product = await Product.findById(req.params.orderId)
            //.populate("Product")
            //.exec()

        if (!product) {
            return res.status(404).json({
                message: "product not found"
            });
        }
        res.status(200).json({
            productFound: product
        });


    } catch (err) {
        return res.status(500).json({
            error: "Can't get products"
        });


    }
};

//router.delete("/:orderId", (req, res, next)

exports.deleteProduct = async (req, res, next) => {
    try {
        let deltedProduct = await Product.remove({ _id: req.params.orderId });
        res.status(200).json({
            message: "Posted product deleted",
            result: deltedProduct
        });

    }
    catch (err) {
        return status(500).json({
            error: "Error in deleting posted product"
        });


    }
}
 
//router.patch("/:productId",
exports.editProducts = async(req,res,next)=>{
    /*constructing a dynamic query
    const objKey= Object.keys(req.body);//Object.keys(obj) returns array of keys
    const updates ={};
    for (let i = 0; i < entries.length; i++) {
     updates[objKey[i]] = Object.values(req.body)[i]//Object.values(object) returns values
   }
   User.update({
    "username": req.params.user
    } , {
    $set: updates
   }
    */
    const id = req.params.productId;
    const keys = Object.keys(req.boody);
    const updates = {};
    for(const ops of keys){
        updates[keys[ops]] = Object.values(req.body)[ops];
    }
    Product.update({_id:id},{$set:updates})
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
   
    

};


