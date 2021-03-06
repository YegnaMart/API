const express = require('express');
const userRouter = express.Router();

const {
  registerUser,
  logUser,
  checkRole,
  serializeUser,
  getVerificationCode,
  verifyCode,
  resetPasswordUsingPhone,
  loginRegister,
  addUserDetail,
  deliveryHistory,
} = require('../controllers/user.controller');
const { checkAuth } = require('../middleware/check-auth');
// @user/register_consumer
// @ create the account for  users
// access Public
userRouter.post('/register', async (req, res) => {
  await registerUser(req.body, res);
});

// @user/register_consumer
// @ create the account for  users
// access Public
userRouter.post('/addUserDetail', async (req, res) => {
  await addUserDetail(req.body, res);
});

// @user/loginRegister
// @ create the account for  users
// access Public

userRouter.post('/loginRegister', async (req, res) => {
  await loginRegister(req.body, res);
});
// @user/log_consumer
// @ create the account for  users
// access Public

userRouter.post('/login', async (req, res) => {
  await logUser(req.body, res);
});

/**
 * get verification route
 */
userRouter.post(
  '/get_verification_code',
  async (req, res) => await getVerificationCode(req.body)
);

/**
 * check the code
 */

userRouter.post('/verify_code', async (req, res) => await verifyCode(req.body));

/**
 * reset password
 */
userRouter.post('/reset_password/:phoneNo', resetPasswordUsingPhone);
//@consumer Protected route
userRouter.get(
  '/consumer_profile',
  checkAuth,
  checkRole(['Consumer']),
  async (req, res) => {
    return res.json(req.user);
  }
);
//@farmer Protected route
userRouter.get(
  '/farmer_profile',
  checkAuth,
  checkRole(['Farmer']),
  async (req, res) => {
    return res.json(serializeUser(req.user));
  }
);
//@admin Protected route
userRouter.get(
  '/admin_profile',
  checkAuth,
  checkRole(['Admin']),
  async (req, res) => {
    return res.json(serializeUser(req.user));
  }
);

userRouter.get('/delivery_history', checkAuth, deliveryHistory);

module.exports = userRouter;
