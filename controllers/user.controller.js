const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let User = require('../models/user.model');

// @user/register
// @ create the account for guest users
// access Public
exports.register = async (req, res) => {
  try {
    const user = await User.find({ phoneNo: req.body.phoneNo });
    if (user.length >= 1) {
      console.log(user);
      return res.status(409).json({
        message: 'Email Already Exists',
      });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err,
          });
        } else {
          let user = new User({
            _id: new mongoose.Types.ObjectId(),
            fullName: req.body.fullName,
            phoneNo: req.body.phoneNo,
            email: req.body.email,
            password: hash,
          });

          // save the user to the database
          user
            .save()
            .then(() => {
              res.status(201).json({
                message: 'You have Successfully signed up.',
              });
            })
            .catch((err) => {
              res.status(500).json({
                error: err,
                message: 'unable to signup',
              });
            });
        }
      });
    }
  } catch (error) {
    const messages = Object.values(error.errors).map((value) => value.message);
    return res.status(500).json({
      message: 'unable to signup',
      error: messages,
    });
  }
};

exports.login = async (req, res) => {
  try {
    let user = await User.find({ phoneNo: req.body.phoneNo });

    if (user.length < 1) {
      return res.status(401).json({
        message: 'Authorization Failed',
      });
    } else {
      try {
        bcrypt.compare(req.body.password, user[0].password);
        const payload = {
          fullName: user[0].fullName,
          phoneNo: user[0].phoneNo,
          email: user[0].email,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: '12h',
        });
        console.log(process.env.JWT_SECRET);
        res.status(200).json({
          message: 'Successfully Logged in',
          token: token,
        });
      } catch (error) {
        return res.status(401).json({
          message: 'Authorization Failed',
          error: error,
        });
      }
    }
  } catch (error) {
    const messages = Object.values(error.errors).map((value) => value.message);
    return res.status(500).json({
      message: 'unable to signup',
      error: messages,
    });
  }
};
