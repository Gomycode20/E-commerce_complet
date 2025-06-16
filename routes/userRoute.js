import express from "express";
import User from "../models/user.js";
import Cart from "../models/cart.js";

const route = express.Router()

route.get("/", async (req, res) => {
    try{
        const users = await User.find()
        if(users.length == 0) return res.status(404).send("No users yet!")
        res.json(users)
    } catch (err) {
        console.error(err)
        res.status(500).json(err)
    }
})

route.get("/:id", async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        if(!user) return res.status(404).send("User not found!")
        res.json(user)
    } catch (err) {
        console.error(err)
        res.status(500).json(err) 
    }
})

route.post("/", async(req, res) =>{
    try{
        const newUser = new User(req.body)

        const cart = new Cart({
            userId: newUser._id
        })
        await cart.save()
        newUser.cartId = cart._id
        await newUser.save();
        res.status(201).send("User created successfully!");
    } catch (err) {
        console.error(err);
        res.status(500).json(err); 
    }
})

route.put("/:id", async (req, res) => {
    try{
         const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new : true })
         if(!updatedUser) return res.status(404).send("User not found!")
         res.send("User updated successfully")
    }catch (err) {
        console.error(err)
        res.status(500).json(err) 
    }
})

route.delete("/:id", async (req, res) => {
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).send("User not found!");
        res.send("User deleted successfully!");
        
    }catch (err) {
        console.error(err)
        res.status(500).json(err) 
    }

});

export default route 