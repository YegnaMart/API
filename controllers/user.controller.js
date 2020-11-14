const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let config = require('../config/config');
let User = require('../models/user.model');
let client = require('twilio')(config.accountSID, config.authToken);
// @user/register
// @ create the account for  users
// access Public

const registerUser = async (userData, role, res) => {
  try {
    //check if phone number already exists
    let phoneNoTaken = await validatePhoneNumber(userData.phoneNo);
    if (phoneNoTaken) {
      return res.status(400).json({
        message: 'Phone Number Already Used.',
        success: false,
      });
    }

    // check if email is taken
    let emailTaken = await validateEmail(userData.email);
    if (emailTaken) {
      return res.status(400).json({
        message: 'Email Already Used.',
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
      role,
    });

    // register user into the database
    await newUser.save();
    return res.status(201).json({
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
const logUser = async (userData, role, res) => {
  let { phoneNo, password } = userData;
  /**
   * check if any user is registered with phoneNo.
   */
  let user = await User.findOne({ phoneNo });
  if (!user) {
    return res.status(404).json({
      message: 'PhoneNo no found, invalid login credentials',
      success: false,
    });
  }

  // check if the user have right credential with right role
  if (user.role != role) {
    return res.status(404).json({
      message:
        'unAuthorized user, please make sure You logged in from the right portal',
      success: false,
    });
  }

  // check if the entered password is valid
  let passwordMatched = await bcrypt.compare(password, user.password);
  console.log(passwordMatched);
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
      email: user.email,
      phoneNo: user.phoneNo,
      role: user.role,
      token: `Bearer ${token}`,
      expiresIn: 24,
    };

    return res.status(200).json({
      ...result,
      message: 'You are Logged in',
      success: true,
    });
  } else {
    return res.status(403).json({
      message: 'incorrect password',
      success: false,
    });
  }
};

/**
 *
 * @ Reset Password {*} with  phoneNo by aid of OTP
 */

const resetPassword = (req, res) => {
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

 let updateUserDetails = async (req,res) => {

 }


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
  resetPassword,
};
