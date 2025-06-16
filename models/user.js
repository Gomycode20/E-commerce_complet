import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    email :{
        type : String,
        required : true,
        unique : true
    }, 
    password :{
        type : String,
        required : true
    }, 
    birthDate: Date,
    fullname : String, 
    role : {
        type : String,
        default : "USER", 
        validate : function(role){
            return role == "ADMIN" || role == "USER"
        }
    },
    createdAt : Date,
    cartId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Cart"
    },
    imgUrl : String 
}) 

userSchema.pre("save", function(next){
    if (!this.createdAt){
        this.createdAt = Date.now()
    }
    next()
})

export default new mongoose.model("User", userSchema)