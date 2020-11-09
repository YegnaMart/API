const router = require("express").Router();
const checkAuth = require("../middlewares/check_auth");
const {checkRole} = require("../middlewares/check_role");
const UserController = require("../controllers/user.controller");

// Users Registeration Route
router.post("/register-farmer", UserController.registerFarmer);
router.post("/register-consumer", UserController.registerConsumer);
router.post("/register-stockmanager",UserController.registerStockManager);
router.post("/register-stockworker",UserController.registerStockWorker);
router.post("/register-deliveryagent",UserController.registerDeliveryAgent);
router.post("/register-deliverypersonnel",UserController.registerDeliveryPersonnel);
router.post("/register-admin",UserController.registerAdmin);

// user Login Route
router.post("/login-farmer",UserController.farmerLogin);
router.post("/login-consumer", UserController.consumerLogin);
router.post("/login-stockmanager", UserController.stockManagerLogin);
router.post("/login-stockworker", UserController.StockWorkerLogin);
router.post("/login-deliveryagent", UserController.deliveryAgentLogin);
router.post("/login-deliverypersonnel", UserController.deliveryPersonnelLogin);
router.post("/login-admin", UserController.adminLogin);



// Users Protected Route
router.get(
  "/farmer-protected",
  checkAuth,
  checkRole(["farmer"]),
  UserController.farmerProtected
);

router.get(
  "/consumer-protected",
  checkAuth,
  checkRole(["consumer"]),
  UserController.consumerProtected
);

router.get(
  "/stockmanager-protected",
  checkAuth,
  checkRole(["stockmanager"]),
  UserController.stockManagerProtected
);
router.get(
  "/stockworker-protected",
  checkAuth,
  checkRole(["stockworker"]),
  UserController.stockworkerProtected
);
router.get(
  "/deliveryagent-protected",
  checkAuth,
  checkRole(["deliveryagent"]),
  UserController.deliveryAgentProtected
);
router.get(
  "/deliverypersonnel-protected",
  checkAuth,
  checkRole(["deliverypersonnel"]),
  UserController.deliveryPersonnelProtected
);
router.get(
  "/admin-protected",
  checkAuth,
  checkRole(["admin"]),
  UserController.adminProtected
);

// router.get(
//   "/admin-stock-manager-protected",
//   checkAuth,
//   checkRole(["admin","stockmanager"]),
//   UserController.adminStockManager
// );



module.exports = router;