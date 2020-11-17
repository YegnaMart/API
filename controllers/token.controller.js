const jwt = require("jsonwebtoken");
const activationToken = (payload)=>{
    jwt.sign(payload,process.env.ACCOUNT_ACIVATION)
}