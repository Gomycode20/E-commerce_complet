import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    products : [{
        product : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Product"
        },
        qte : Number
    }],
    total : Number
})

cartSchema.pre("save",async function(next){
    await this.populate('products.product')
    this.total = this.products.reduce((acc, val)=> acc + val.product.price * val.qte, 0)
    next()
})

export default new mongoose.model("Cart", cartSchema)