const Location = require("../models/location.model");
const User = require("../models/user.model");

exports.driverLocation = async(req,res)=>{

}
exports.forgotPassword =async(req,res)=>{
    try{
    const{email} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({
            message:"user with this email does not exist"
        });

    }
    //else jenerate token and send that token with email links
    const token = jwt.sing({_id:user._id},process.env.RESET_PPASSWORD_TOKEN,{expires:'12m'});
    const data ={
        
    }

}catch(err){

}
}