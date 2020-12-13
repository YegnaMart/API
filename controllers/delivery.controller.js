const Delivery = require("../models/delivery.model");
const moment = require("moment");
//const checkAuth = require("../middlewares/check_auth");

//router.post("/",(req,res,next)

exports.addDelivery = async (req, res, next) => {
    try {
        const deliveryId = req.params.deliveryId;
        const newDelivery = new Delivery({
            deliveryId,
            pickup_location:req.body.pickup_location,
            dropoff_location:req.body.dropoff_location
            
            });

    let delivery = await newDelivery.save();
        return res.status(200).json({
            delivery:delivery,
            message: "Delivery is requested successfully"
            
        });


    }
    catch (err) {
        res.status(500).json({
            error: "Request in not sent please try again",

        });

    }
}

//router.get("/",(req,res,next
exports.getDelivery = async (req, res, next) => {
    try {
        let delivery = await Delivery.find();

        if (!delivery) {
            return res.status(400).json({
                error: "Order not  found"
            });
        }
        return res.status(200).json({
            success: true,
            order: delivery
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
        let delivery = await Delivery.findById(req.params.orderId);

        if (!delivery) {
            return res.status(404).json({
                message: "Delivery not found"
            });
        }
        res.status(200).json({
            delivery: Delivery
        });


    } catch (err) {
        return res.status(500).json({
            error: "Can't get an Delivery"
        });


    }
};

//router.delete("/:orderId", (req, res, next)

exports.deleteDelivery = async (req, res, next) => {
    try {
        let deltedDelivery = await Delivery.remove({ _id: req.params.orderId });
        res.status(200).json({
            message: "Delivery deleted",
            result: deltedDelivery
        });

    }
    catch (err) {
        return status(500).json({
            error: "Error in deleting orders"
        });


    }
}
 
//router.patch("/:productId",
exports.editDelivery = async(req,res,next)=>{
   const id = req.params.productId;
    const keys = Object.keys(req.body);
    const updates = {};
    for(const ops of keys){
        updates[keys[ops]] = Object.values(req.body)[ops];
    }
    Delivery.update({_id:id},{$set:updates})
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
