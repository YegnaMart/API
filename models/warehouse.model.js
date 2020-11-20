const { Schema, model } = require("mongoose");

const warehouseSchema = new Schema({
    warehouse_code: {
        type: String,
        default: "AAW-001"
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: "Location"
    },

    placeName: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    storage_capacity: {
        type: Number,
        required: true
    },


}, { timestamps: true });

module.exports = model("Warehouse", warehouseSchema);