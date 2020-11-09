
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");


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

exports.registerDeliveryAgent= async (req, res) => {
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

exports.consumerLogin =  async (req, res) => {
  await userLogin(req.body, "consumer", res);
};

exports.stockManagerLogin = async (req, res) => {
    await userLogin(req.body, "stockmanager", res);
  };
 
exports. StockWorkerLogin = async (req, res) => {
    await userLogin(req.body, "stockworker", res);
  };
 
exports.deliveryAgentLogin =  async (req, res) => {
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
      password:hashedPassword,
      role
    });
    newUser.save();
    return res.status(201).json({
       message: "Hurry! now you are successfully registred...",
      success:true
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
  // Now check for the password
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
      laocation:user.location,
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
//check the role of the user
// exports.checkRole = roles => (req, res, next) =>
//   !roles.includes(req.user.role)
//     ? res.status(401).json("Unauthorized")
//     : next();

//check phone number
const checkPhoneNumber = async (phoneNo) => {
  let user = await User.findOne({ phoneNo });
    return user ? false : true;
  };


  
