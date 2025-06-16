import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    category : String,
    price : {
        type : Number,
        required : true
    },
    availability :{
        type : Boolean,
        default : true
    },
    imgUrl : String,
    description : String,
    size :{
        type : String,
        default: "BIG",
        validate: function(value){
            return value == "BIG" || value == "SMALL"
        }
    }

})

export default new mongoose.model("Product", productSchema)