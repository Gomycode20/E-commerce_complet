import express from "express"
import User from "../models/user.js"

const route = express.Router()

route.post("/login", async (req, res)=> {
    try{
        const{ username, email, password} = req.body;

        if(email){
            var user = await User.findOne({email, password})
        }else if(username) {
            var user = await User.findOne({username, password})
        }else{
            return res.status(403).send("Invalid credentials!")
        }
        
        if(user){
            res.json(user)
        } else {
            res.status(403).send("Invalid credentials!")
        }

    }catch (err) {
        console.error(err)
        res.status(500).json(err) 
    }
})


export default route