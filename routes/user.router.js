const express = require('express');
const userRouter = express.Router();

const { register, login, sendopt } = require('../controllers/user.controller');

// show the pathway to register request
userRouter.route('/register').post(register);

userRouter.route('/login').post(login);

userRouter.route('/sendotp').post(sendopt);

module.exports = userRouter;