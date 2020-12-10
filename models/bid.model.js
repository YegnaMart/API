const { Schema, model } = require("mongoose");

const bidSchema = new Schema({

    product: {
        type:Schema.Types.ObjectId,
        ref:"Product"
    },
    initialFee: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        required: false
    },

    bidStart: {
        type: String,
        required:true
    },
    bidEnd: {
        type: String,
        required: true
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "Warehouse"
    },
    startingBidPrice: {
        type: Number,
        default: 0
    },

    bidder:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    state:{
        type:String,
        default:"closed",
        enum:["open","closed","scheduled"]

    },
    bidNo: Number,


}
, { timestamps: true })

module.exports = model('Bid', bidSchema)