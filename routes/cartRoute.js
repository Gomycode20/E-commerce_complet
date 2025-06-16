import express from "express";
import Cart from "../models/cart.js";
import Product from "../models/product.js";

const route = express.Router()

route.get("/:userId", async (req, res) =>{
    try{
        const cart = await Cart.findOne({userId: req.params.userId })
        if(!cart) return res.status(404).send("Cart not found!")
            res.json(cart) 
    } catch (err) {
        console.error(err)
        res.status(500).json(err) 
    }
})

route.put("/:id/add/:prodId", async (req, res) => {
    try{
        const cart = await Cart.findById(req.params.id)
         if(!cart) return res.status(404).send("Cart not found!")

        const product= await Product.findById(req.params.prodId)
         if(!product) return res.status(404).send("Product not found!")

        const object = cart.products.find(obj => obj.product.equals(product._id))
         if(!object){
            cart.products.push({
                product,
                qte : 1
            })
            await cart.save()
            res.send("Product added to cart!")
        }else{
            object.qte += 1
            await cart.save()
            res.send("Product quantity increased!")
        }
    }catch (err) {
        console.error(err)
        res.status(500).json(err) 
    }
    
})

route.put("/:id/sub/:prodId", async (req, res) => {
    try{
        const cart = await Cart.findById(req.params.id)
         if(!cart) return res.status(404).send("Cart not found!")

        const product= await Product.findById(req.params.prodId)
         if(!product) return res.status(404).send("Product not found!")

        const object = cart.products.find(obj => obj.product.equals(product._id))

        if(!object){
            return res.status(404).send("Product does not exist in cart!")
        } else if ( object.qte < 2 ){
            cart.products = cart.products.filter(obj => obj.product.toString() !== product._id.toString())
            await cart.save()
            res.send("Product removed from cart!")
        } else {
            object.qte -= 1
            await cart.save()
            res.send("Product quantity decreased!")
        }
       
    }catch (err) {
        console.error(err)
        res.status(500).json(err) 
    }
    
})


route.put("/empty-cart/:id", async (req, res)=> {
    try{
        const cart = await Cart.findById(req.params.id)
        if(!cart) return res.status(404).send("Cart not found!")
        
            cart.products = []
            await cart.save()
            res.send("Cart emptied successfuly!")
    }catch (err) {
        console.error(err)
        res.status(500).json(err) 
    }
})

export default route