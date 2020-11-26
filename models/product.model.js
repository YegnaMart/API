const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  
  productName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  regionOfOrign: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  productImage: {
    type: String,
    required: false
  },
  productGrade: {
    type: String,
    required: true
  },

  postedBy: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = model("Product", productSchema);


