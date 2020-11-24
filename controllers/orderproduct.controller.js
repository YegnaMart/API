const Order = require("../models/order.model");
const moment = require("moment");

//router.post("/",(req,res,next)

exports.addOrders = async (req, res, next) => {
    try {
        //const orderedBy= req.userData._id;
        const order = new Order({
            productName: req.body.productName,
            quantity: req.body.quantity,
            time: moment(req.body.time).format(
                'MMMM Do YYYY, h:mm:ss a'),
            description: req.body.description,
            productGrade: req.body.productGrade,
            payment_id: req.body.payment_id,
            //orderedBy

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

