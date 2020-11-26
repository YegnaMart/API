const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
  try {
      // we use authorization authorization  token to verify token
    const token = req.headers.authorization.split(" ")[1];
    //console.log(token);
    const decodedToken = jwt.verify(token,process.env.JWT_SECRET,null );
    //{email: decodedToken.email, userId: decodedToken.userId };
    req.userData = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: "You are not authenticated!" });
  }
};