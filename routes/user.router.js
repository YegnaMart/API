const express = require('express');
const userRouter = express.Router();

const {
  registerUser,
  logUser,
  checkRole,
  serializeUser,
} = require('../controllers/user.controller');
const { checkAuth } = require('../middleware/check-auth');
// @user/register_consumer
// @ create the account for  users
// access Public
userRouter.post('/register_consumer', async (req, res) => {
  await registerUser(req.body, 'Consumer', res);
});

// @user/register_farmer
// @ create the account for  farmers
// access Public
userRouter.post('/register_farmer', async (req, res) => {
  await registerUser(req.body, 'Farmer', res);
});

// @user/register admin
// @ create the admin account
// access Private
userRouter.post('/register_admin', async (req, res) => {
  await registerUser(req.body, 'Admin', res);
});

// @user/log_consumer
// @ create the account for  users
// access Public

userRouter.post('/log_consumer', async (req, res) => {
  await logUser(req.body, 'Consumer', res);
});

// @user/log_farmer
// @ log into the account for  users
// access Public

userRouter.post('/log_farmer', async (req, res) => {
  await logUser(req.body, 'Farmer', res);
});

// @user/log_admin
// @ log admin account
// access Private

userRouter.post('/log_admin', async (req, res) => {
  await logUser(req.body, 'Admin', res);
});

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

module.exports = userRouter;
