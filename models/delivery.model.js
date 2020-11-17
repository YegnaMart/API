const {Schema,model} = require("mongoose");

const deliverySchema = new Schema({
  deliveryId: {
        type: Schema.Types.ObjectId,
        ref: "User",
         
         },
    
  location: { 
        type:Schema.Types.ObjectId,
        ref: "Location"
     },
     
  userId:{
      type:Schema.Types.ObjectId,
      ref:"User"

    },
    
    },{timestamps:true});
    
    module.exports = model("Delivery", deliverySchema);