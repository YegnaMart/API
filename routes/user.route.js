const router = require("express").Router();
const checkAuth = require("../middlewares/check_auth");
const {checkRole} = require("../middlewares/check_role");
const UserController = require("../controllers/user.controller");

// Users Registeration Route
router.post("/register", UserController.userSignup);
router.post("/login",UserController.userLogin);
//password reset routes
router.post("/forgot-password",UserController.forgotPassword);
router.post("/reset-password",UserController.resetPassword );



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