const {Schema,model} = require("mongoose");

const warehouseSchema = new Schema({
    placeName:{
        type:String,
        required:true
    },
    region:{
        type:String,
        required:true
    }
     
},{timestamps:true});
    
    module.exports = model("WareHouse", warehouseSchema);