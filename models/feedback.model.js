const{Schema,model, mongoose} = require("mongoose");

const feedbackSchema = new Schema({
    comments:[{
        text:{
            type:String,
            required:true
        },
        userId:{
            type:Schema.Types.ObjectId,
             ref: "User", required: true
          }
    }]
});

module.exports = model("Feedback",feedbackSchema);