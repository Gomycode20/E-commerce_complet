import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import authRoute from "./routes/authRoute.js";


dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Connected to db!"))
.catch(err =>console.error("Failed to connect to db :", err));

const app = express();

app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.get("/", (req, res) =>{
    res.send("server is running")
})
//routes

app.use("/api/users", userRoute)
app.use("/api/products", productRoute) 
app.use("/api/cart", cartRoute)
app.use("/api/auth", authRoute)

app.use((req, res) => {
    res.status(404).send("invalid path or method")
})

app.listen(process.env.PORT, ()=> {
    console.log(`server is running on http://localhost:${process.env.PORT}`)
})