const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let config = require('../config/config');
let User = require('../models/user.model');
let client = require('twilio')(config.accountSID, config.authToken);
// @user/register
// @ create the account for  users
// access Public

const loginRegister = async (userData, res) => {
  const { phoneNo, firebaseUid } = userData;

  if (firebaseUid) {
    userData.password = firebaseUid;
  }
  let userByPhone = await User.findOne({ phoneNo: phoneNo });
  let userByUid = await User.findOne({ firebaseUid: firebaseUid });

  if (!userByPhone && !userByUid) {
    registerUser(userData, res);
  } else {
    logUser(userData, res, firebaseUid);
  }
};

let addUserDetail = async (userData, res) => {
  let data = await User.findOneAndUpdate(
    { phoneNo: userData.phoneNo },
    {
      fullName: userData.fullName,
      role: userData.role,
      placeName: userData.placeName,
    },
    { new: true, useFindAndModify: false }
  );

  if (!data) {
    res.status(500).json({
      success: false,
      message: `unable to create user`,
    });
  } else {
    res.status(201).json({
      data: data,
      success: true,
    });
  }
};

const registerUser = async (userData, res) => {
  try {
    //check if phone number already exists
    let phoneNoTaken = await validatePhoneNumber(userData.phoneNo);
    if (phoneNoTaken) {
      return res.status(400).json({
        message: 'Phone Number Already Used, try another.',
        success: false,
      });
    }

    /**
     * Either Email or Phone number is not taken so we can use them to register
     */

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = new User({
      ...userData,
      password: hashedPassword,
    });

    // register user into the database
    const data = await newUser.save();
    console.log(data);

    let token = jwt.sign(
      {
        user_id: data._id,
        name: data.fullName,
        role: data.role,
        email: data.email,
        phoneNo: data.phoneNo,
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(201).json({
      data: {
        _id: data._id,
        token: token,
      },
      message: 'You have successfully signed up.',
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'unable to create an account',
      success: false,
      err: err,
    });
  }
};

// @user/login
// @ create the account for  users
// access Public
const logUser = async (userData, res, firebaseUid = false) => {
  let { phoneNo, password } = userData;
  /**
   * check if any user is registered with phoneNo.
   */
  let user = await User.findOne({ phoneNo: phoneNo });
  if (!user) {
    return res.status(404).json({
      message: 'PhoneNo noT found, invalid login credentials',
      success: false,
    });
  } else {
    let passwordMatched;
    // check if the entered password is valid
    passwordMatched = await bcrypt.compare(password, user.password);

    if (passwordMatched) {
      let token = jwt.sign(
        {
          user_id: user._id,
          name: user.fullName,
          role: user.role,
          email: user.email,
          phoneNo: user.phoneNo,
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      // check the result
      let result = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNo: user.phoneNo,
        role: user.role,
        token: `Bearer ${token}`,
        expiresIn: 24,
      };

      console.log(result);

      return res.status(200).json({
        data: result,
        message: 'You are Logged in',
        success: true,
      });
    } else {
      return res.status(403).json({
        message: 'incorrect password',
        success: false,
      });
    }
  }
};

/**
 *
 * @ Reset Password {*} with  phoneNo by aid of OTP
 */

const resetPasswordUsingPhone = (req, res) => {
  try {
    let phone = req.params.phoneNo;
    User.findOne({ phoneNo: phone })
      .then((result) => {
        if (result.password != null) {
          bcrypt.hash(req.body.password, 10).then((hashedPassword) => {
            result.password = hashedPassword;

            result
              .save()
              .then((data) => {
                res.status(201).json({
                  data,
                });
              })
              .catch((err) => {
                res.json({
                  message: 'unable to update password',
                  success: false,
                });
              });
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: 'unable to reset password',
          err,
        });
      });
  } catch (error) {}
};

/**
 *
 * @ update user detail
 */

let updateUserDetails = async (req, res) => {};

/**
 *
 * @ Request Verification Code
 */
const getVerificationCode = async (userInput) => {
  try {
    let data = await client.verify
      .services(config.serviceID)
      .verifications.create({
        to: `+${userInput.phoneNo}`,
        channel: userInput.channel,
      });
    return data;
  } catch (error) {
    return error;
  }
};

/**
 *
 * @ Verify the code sent to phoneNo
 */
let verifyCode = async (userInput) => {
  try {
    let data = await client.verify
      .services(config.serviceID)
      .verificationChecks.create({
        to: `+${userInput.phoneNo}`,
        code: userInput.code,
      });

    return data;
  } catch (error) {
    return error;
  }
};

const deliveryHistory = async (req, res) => {
  const id = req.user.user_id;
  console.log(id);
  let response = await User.findOne({ _id: id }).populate(
    'deliveryHistory.delivery'
  );
  console.log(response.deliveryHistory);
  res.status(200).json({ data: response.deliveryHistory });
};

/**
 * Phone Number already exists
 */
const validatePhoneNumber = async (phoneNo) => {
  let user = User.findOne({ phoneNo });
  return user;
};

/**
 * Check if email already exists
 */
let validateEmail = async (email) => {
  let user = User.findOne({ email });
  return user;
};

/**
 * Check the users Role
 */

const checkRole = (roles) => (req, res, next) => {
  roles.includes(req.user.role)
    ? next()
    : res.status(401).json({
        message: 'unAuthorized',
        success: false,
      });
};
/**
 * @ hide the password from being exposed
 */
const serializeUser = (user) => {
  return {
    _id: user.user_id,
    name: user.fullName,
    email: user.email,
    phoneNo: user.phoneNo,
    role: user.role,
  };
};
module.exports = {
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
};
