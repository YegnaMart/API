const {Schema,model} = require("mongoose");

const requestdeliverySchema = new Schema({
  deliveryId: {
        type: Schema.Types.ObjectId,
        ref: "User",
         
         },
    
  pickup_Location: { 
        type:Schema.Types.ObjectId,
        ref: "Wharehouse"
     },
     
  dropoff_Location:{
      type:Schema.Types.ObjectId,
      ref:"User"

    },
    
    },{timestamps:true});
    
    module.exports = model("RequestDelivery", requestdeliverySchema);