const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Feedback = require("../models/feedback.model")
const nodemailer = require("nodemailer");


//configuring nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,//for 465 secure:true and for 587 secure:false

  auth: {

    user: process.env.EMAIL,
    pass: process.env.PASSWORD,

  }
});


// Users Registeration controllers
exports.registerFarmer = async (req, res) => {
  await userRegister(req.body, "farmer", res);
};

exports.registerConsumer = async (req, res) => {
  await userRegister(req.body, "consumer", res);
};

exports.registerStockManager = async (req, res) => {
  await userRegister(req.body, "stockmanager", res);
};

exports.registerStockWorker = async (req, res) => {
  await userRegister(req.body, "stockworker", res);
};

exports.registerDeliveryAgent = async (req, res) => {
  await userRegister(req.body, "deliveryagent", res);
};

exports.registerDeliveryPersonnel = async (req, res) => {
  await userRegister(req.body, "deliverypersonnel", res);
};
exports.registerAdmin = async (req, res) => {
  await userRegister(req.body, "admin", res);
};
//user login controller
exports.farmerLogin = async (req, res) => {
  await userLogin(req.body, "farmer", res);
};

exports.consumerLogin = async (req, res) => {
  await userLogin(req.body, "consumer", res);
};

exports.stockManagerLogin = async (req, res) => {
  await userLogin(req.body, "stockmanager", res);
};

exports.StockWorkerLogin = async (req, res) => {
  await userLogin(req.body, "stockworker", res);
};

exports.deliveryAgentLogin = async (req, res) => {
  await userLogin(req.body, "deliveryagent", res);
};

exports.deliveryPersonnelLogin = async (req, res) => {
  await userLogin(req.body, "deliverypersonnel", res);
};

exports.adminLogin = async (req, res) => {
  await userLogin(req.body, "admin", res);
};


//  Protected route controllers

exports.farmerProtected = async (req, res) => {
  return res.json("Hello farmer");
};

exports.consumerProtected = async (req, res) => {
  return res.json("Hello consummer");
};

exports.deliveryAgentProtected = async (req, res) => {
  return res.json("Hello deliveryagent");
};

exports.deliveryPersonnelProtected = async (req, res) => {
  return res.json("Hello delivery personnel");
};

exports.stockManagerProtected = async (req, res) => {
  return res.json("Hello stockmanager");
};

exports.stockworkerProtected = async (req, res) => {
  return res.json("Hello stockworker");
};

exports.adminProtected = async (req, res) => {
  return res.json("Hello Admin");
};



//check user exists
const userRegister = async (userData, role, res) => {
  try {
    // Validate the pho
    let phone = await checkPhoneNumber(userData.phoneNo);
    if (!phone) {
      return res.status(400).json({
        message: `phone is already taken.`,
        success: false
      });
    }


    const hashedPassword = await bcrypt.hash(userData.password, 10);
    // create a new user
    const newUser = new User({
      ...userData,
      password: hashedPassword,
      role
    });
    newUser.save();
    //.then(newUser=>{
    // transporter.sendMail({
    //   to:newUser.email,
    //   from:"yegnamart@gmail.com",
    //   subject:"Signup success",
    //   html:<h1>well come to yegnamart</h1>
    // })

    //})
    return res.status(201).json({
      message: "Registration successful, please check your email for verification instructions",
      success: true
    });
  } catch (err) {
    return res.status(500).json({
      message: "Unable to create your account..."

    });
  }

};

// user Login util

const userLogin = async (userCreds, role, res) => {
  let { email, password } = userCreds;
  // First Check if the email is in the database
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "Email is not found. Invalid login credentials.",
      success: false
    });
  }

  // We will check the role
  if (user.role !== role) {
    return res.status(403).json({
      message: "Please make sure you are logging in from the right portal.",
      success: false
    });
  }
  // confirm that user typed same password twice
  // if (req.body.password !== req.body.confirmPassword) {
  //   var err = new Error('Passwords do not match.');
  //   err.status = 400;
  //   return next(err);
  // }
  // Now check for the password user entered with password in db
  let isMatch = bcrypt.compare(password, user.password);
  if (isMatch) {
    // Sign in the token and issue it to the user
    let token = jwt.sign(
      {
        user_id: user._id,
        role: user.role,
        phoneNo: user.phoneNo,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: "7 days" }
    );

    let result = {
      fullname: user.fullname,
      role: user.role,
      email: user.email,
      laocation: user.location,
      token: token,
      expiresIn: 168
    };

    return res.status(200).json({
      ...result,
      message: "You are now logged in.",
      //success: true
    });
  } else {
    return res.status(403).json({
      message: "Incorrect password.",
      success: false
    });
  }
};


//check phone number
const checkPhoneNumber = async (phoneNo) => {
  let user = await User.findOne({ phoneNo });
  return user ? false : true;
};


//reset password controller
exports.resetPasswordRequest = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User with this email does not exist",
        success: false
      });
    }
    //if exist
    const token = jwt.sign({
      user_id: user._id
    }, process.env.JWT_PASSWORD_RESET,
      { expiresIn: "30m" })


    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Password reset Link",
      html: `<h1> Please click the link to reset</h1>
        <p>${process.env.CLEINT_URL}/users/password/reset/${token}</p>`
    };
    await User.updateOne({
      passwordResetToken: token
    });
    transporter.sendMail(emailData);
    console.log("Email sent");
    res.status(200).json({
      message: "Successfully sent email"
    });

  } catch (err) {
    return res.status(401).json({
      message: "error "
    });

  }

};


//new password controller


exports.resetPassword = async (req, res) => {
  try {
    const { passwordResetToken, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    if (passwordResetToken) {
      jwt.verify(passwordResetToken.process.env.JWT_PASSWORD_RESET, (err, decoded) => {
        if (err) {
          return res.status(400).json({
            error: "The token is expire"
          });
        }
        User.findOne({ passwordResetToken }, (err, user) => {
          if (err) {
            return res.status(400).json({
              error: "Incorrect token"
            });
          }
          const updatedFields = {
            password: hashedPassword,
            passwordResetToken: ""
          }
          user = _.extend(user, updatedFields);
          user.save((err, result) => {
            if (err) {
              return res.status(400).json({
                error: "Error reseting user password"
              });
            }
            res.json({
              message: "Greet! now you can login"
            });

          })
        })
      })
    };

  }

  catch (ex) {
    getLogger.error(ex);
    res.send(ex, 500);

  }

};
//router.patch("/api/users/update",checkAuth,Usercaontroler.UpdateUser)
exports.updateUser = async (req, res) => {
  try {
    const { fullname, email, location, phoneNo } = req.body;
    await User.findOneAndUpdate({ _id: req.userData.id }, {
      fullname, email, location, phoneNo
    });
    return res.status(200).json({ message: "updated successfully" });
  } catch (err) {
    return res.status(500).json({
      error: err
    });
  }
};

//router.delete("/api/users/delete/:id",checkAuth,checkRole[""],Usercaontroler.deleteUser)
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "deleted successfully"
    });
  } catch (err) {
    return res.status(500).json({
      error: err
    });
  }
};

//logout user
exports.logoutUser = async (req, res) => {

};

//send feedback
exports.SendFeedBack = async (req, res) => {
  const comments = {
    text: req.body.text,
    postedBy: req.userData._id
  }
  await Feedback.findByIdAndUpdate(req.body._id, {
    $push: { comments: comments }
  }, { new: true })//return updated
    .populate("comments:postedBy", "_id fullname")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    })


}