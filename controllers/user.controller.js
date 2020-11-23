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
  secure: false,

  auth: {

    user: "misge1898@gmail.com",
    pass: "mehari12old2bro"

  }
});



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

 //register user
exports.userSignup = async (req,res,next) => {
 try{
   const{fullname,email,phoneNo,role,location,password} = req.body;
   let phone = await checkPhoneNumber(phoneNo);
    if (!phone) {
      return res.status(400).json({
        message: `phone is already taken.`,
        success: false
      });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      fullname,
      email,
      phoneNo,
      role,
      location,
      password:hashedPassword
    });
    await newUser.save();
    res.status(201).json({
      data:newUser,
      message:"user addeded successfuly"
    });

 }catch(error){
   next(error);

 }

};

// user Login util

exports.userLogin = async (req, res, next) => {
  const{ phoneNo, password,role } = req.body;
  const user = await User.findOne({ phoneNo });
  if (!user) {
    return res.status(404).json({
      message: "Phone is not found. Invalid login credentials.",
      success: false
    });
  }
  if (user.role !== role) {
    return res.status(403).json({
      message: "Please make sure you are logging in from the right portal.",
      success: false
    });
  }
  let isMatch = validatePassword(password, user.password);
  if (isMatch) {
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
      lacation: user.location,
      token: token,
      expiresIn: 168
    };

    return res.status(200).json({
      ...result,
      message: "You are now logged in.",
      success: true
    });
  } else {
    return res.status(403).json({
      message: "Incorrect password.",
      success: false
    });
  }

};


const checkPhoneNumber = async (phoneNo) => {
  let user = await User.findOne({ phoneNo });
  return user ? false : true;
};


const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);

}

const validatePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);

}


//forgot password 
exports.forgotPassword = async (req, res) => {
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
    },
      process.env.JWT_PASSWORD_RESET,
      {
        expiresIn: "10m"
      });

    await User.updateOne({
      passwordResetToken: token
    });

    //prepare the data to be emaild
    const emailData = {
      from: "misge1898@gmail.com",
      to: email,
      subject: " YegnaMart Password reset",
      html: `<h1> Please click the link to reset</h1>
        <p>${process.env.CLEINT_URL}/users/password/reset/${token}</p>`
    };

    transporter.sendMail(emailData);
    res.status(200).json({
      message: 'An email has been sent to your email. Password reset link is only valid for 10 minutes.'
    });

  }
  catch (err) {
    return res.status(401).json({
      message: "error "
    });

  }

};


//new password controller


exports.resetPassword = async (req, res) => {
  try {
    const newPassword = req.body.passsword;
    const sentToken = req.body.passwordResetToken;
    const user = await User.findOne({ passwordResetToken: sentToken });
    if (!user) {
      return res.status(422).json({
        message: "Try again Session is expired"
      });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    user.passwordResetToken = undefined

    await user.save();

    const data = {
      to: email,
      from: "misge1898@gmail.com",
      html: 'reset-password',
      subject: 'Password Reset Confirmation',

    };
    await transport.sendMail(data);

    res.status(200).json({
      message: 'Your password is successfully reseted'
    });

  }

  catch (err) {

    return res.status(500).json({
      err: "error occuring in resseting password"
    });

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