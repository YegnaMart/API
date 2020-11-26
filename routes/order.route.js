const router = require("express").Router();
//const checkAuth = require("../middlewares/check_auth");
//const {checkRole} = require("../middlewares/check_role");
const OrderController = require("../controllers/orderproduct.controller");

router.post("/add_orders",
    OrderController.addOrders);

router.get("/get_orders",
    OrderController.getOrders);

router.get("/get_orders/:orderId",
    OrderController.getOrdersById);

router.delete("/delete/:orderId",
    OrderController.deleteOrders);




module.exports = router;