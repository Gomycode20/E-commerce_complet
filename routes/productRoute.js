import express from "express";
import Product from "../models/product.js"

const route = express.Router()

route.get("/", async (req, res) => {
    try{
        const products = await Product.find(req.query);
        if(products.length == 0) return res.status(404).send("No products yet!");
        res.json(products);    
    } catch (err) {
        console.error(err)
        res.status(500).json(err) 
    }
}); 

route.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send("product not found");
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

route.post("/", async(req, res) => {
    try{
        const newProd = new Product(req.body)
        await newProd.save()
        res.send("Product created successfully!")
    }catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

route.put("/:id", async (req, res) => {
    try{
         const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new : true })
         if(!updatedProduct) return res.status(404).send("Product not found!")
         res.send("Product updated successfully")
    }catch (err) {
        console.error(err)
        res.status(500).json(err) 
    }
}); 


route.delete("/:id", async (req, res) => {
    try{
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).send("Product not found!");
        res.send("Product deleted successfully!");
        
    }catch (err) {
        console.error(err)
        res.status(500).json(err) 
    }

});

export default route 

