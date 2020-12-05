const {Schema,model} = require("mongoose");

const orderSchema = new Schema({
  productName: {
    type: String,
    required: true
  },
  time:{
    type:String,
    required:true
  },
  quantity: {
    //amount
    type: Number,
    required: true
  },
  
  description: {
    type: String
  },
  
  productGrade: {
    type: String,
    required: true
  },
 payment_id: {
   type:String,
   required:true
 },
 orderedBy:{
   type:Schema.Types.ObjectId,
   ref:"User"
 }
  
  },{timestamps:true});
  
  module.exports = model('Order', orderSchema)