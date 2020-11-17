const {Schema,model, Mongoose} = require("mongoose");
const userSchema = new Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },

    phoneNo:{
        type:String,
        required:true
    },
  
    role:{
        type:String,
        default:"farmer",
        enum:["farmer","consumer","stockmanager","stockworker","deliveryagent","deliverypersonnel","admin"]
    },
    location:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    passwordResetToken:{
        type:String
    }


},{timestamps:true});

 module.exports = model("User",userSchema);