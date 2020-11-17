const User = require("../models/user.model");
const Post = require("../models/product.model");

exports.userProfile = async(req,res)=>{
   // router.get("/users/profile/:id")
   await User.findOne({_id:req.body._id})
   .select("-password")
   .then(user=>{
       Post.findOne({postedBy:req.params._id})
       .populate("postedBy","_id fullname")
       .exec((er,post)=>{
           res
       })

   }).catch()
}