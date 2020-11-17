const {Schema,model} = require("mongoose");

const bidSchema = new Schema({
    productName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    initialFee: {
           type: Number,
            required: true
         },
    
    category: { 
        type: Schema.Types.ObjectId,
        ref: "Product", required: true
     },
    bidStart:{
         type:Date,
         required:true
     },
    bidEnd:{
         type:Date,
         required:true
     },
    startingBidPrice:{
         type:Number,
         required:true
     },
    warehouseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Warehouse"
    },
    bids: [{
        bidder: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
        bid: Number,//the number of bids
        time: Date
      }]

    },{timestamps:true});
    
    module.exports = model("Bid", bidSchema);