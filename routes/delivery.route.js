const router = require("express").Router();
//const checkAuth = require("../middlewares/check_auth");
//const {checkRole} = require("../middlewares/check_role");
const DeliveryController = require("../controllers/delivery.controller");

router.post("/add_delivery",
    DeliveryController.addDelivery);

// router.get("/get_delivery",
//     OrderController.getOrders);

// router.get("/get_orders/:orderId",
//     OrderController.getOrdersById);

// router.delete("/delete/:orderId",
//     OrderController.deleteOrders);




module.exports = router;