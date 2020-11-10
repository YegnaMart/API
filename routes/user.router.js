const express = require('express');
const userRouter = express.Router();

const { register, login } = require('../controllers/user.controller');

// show the pathway to register request
userRouter.route('/register').post(register);
userRouter.route('/login').post(login);

module.exports = userRouter;
