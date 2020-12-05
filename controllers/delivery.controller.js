const Delivery = require("../models/delivery.model");
const moment = require("moment");
//const checkAuth = require("../middlewares/check_auth");

//router.post("/",(req,res,next)

exports.addDelivery = async (req, res, next) => {
    try {
        const orderedBy= req.user_id;
        const delivery = new Delivery({
            quintal_per_km: req.body.quintal_per_km,
            quantity: req.body.quantity,
            time: moment(req.body.time).format(
                'MMMM Do YYYY, h:mm:ss a'),
            description: req.body.description,
            productGrade: req.body.productGrade,
            payment_id: req.body.payment_id,
            orderedBy

        });

    let orders = await order.save();
        return res.status(200).json({
            message: "Order is success fully added",
            orders
        });


    }
    catch (err) {
        res.status(500).json({
            error: "orders is not added try again",

        });

    }
}

//router.get("/",(req,res,next
exports.getOrders = async (req, res, next) => {
    try {
        let orders = await Order.find()
        .populate("orderedBy")

        if (!orders) {
            return res.status(400).json({
                error: "Order not  found"
            });
        }
        return res.status(200).json({
            success: true,
            order: orders
        });
    } catch (err) {
        return res.status(400).json({
            error: "Error in geting orders"
        });
    }

};


//router.get("/:orderId", (req, res, next)

exports.getOrdersById = async (req, res, next) => {

    try {
        let order = await Order.findById(req.params.orderId)
            .populate("Product")
            .exec()

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }
        res.status(200).json({
            order: order
        });


    } catch (err) {
        return res.status(500).json({
            error: "Can't get an order"
        });


    }
};

//router.delete("/:orderId", (req, res, next)

exports.deleteOrders = async (req, res, next) => {
    try {
        let deltedOrder = await Order.remove({ _id: req.params.orderId });
        res.status(200).json({
            message: "Order deleted",
            result: deltedOrder
        });

    }
    catch (err) {
        return status(500).json({
            error: "Error in deleting orders"
        });


    }
}
 
//router.patch("/:productId",
exports.editOrder = async(req,res,next)=>{
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
