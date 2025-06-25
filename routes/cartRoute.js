import express from "express";
import Cart from "../models/cart.js";
import Product from "../models/product.js";

const route = express.Router();

// 🛒 Obtenir le panier d’un utilisateur
route.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate("products.product");
    if (!cart) return res.status(404).send("Panier introuvable !");
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ➕ Ajouter un produit au panier
route.put("/:id/add/:prodId", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) return res.status(404).send("Panier introuvable !");

    const product = await Product.findById(req.params.prodId);
    if (!product) return res.status(404).send("Produit introuvable !");

    const item = cart.products.find(p => p.product.equals(product._id));

    if (!item) {
      cart.products.push({
        product: product._id,
        quantity: 1,
        size: req.body.size || [],
      });
      await cart.save();
      res.send("Produit ajouté au panier Zinzawa 🧵");
    } else {
      item.quantity += 1;
      if (req.body.size && !item.size.includes(req.body.size)) {
        item.size.push(req.body.size); // Mettre à jour la taille si fournie
      }
      await cart.save();
      res.send("Quantité du produit augmentée dans le panier ✨");
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ➖ Diminuer la quantité ou retirer le produit du panier
route.put("/:id/sub/:prodId", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) return res.status(404).send("Panier introuvable !");

    const product = await Product.findById(req.params.prodId);
    if (!product) return res.status(404).send("Produit introuvable !");

    const item = cart.products.find(p => p.product.equals(product._id));

    if (!item) {
      return res.status(404).send("Ce produit n'est pas dans votre panier.");
    } else if (item.quantity <= 1) {
      cart.products = cart.products.filter(p => !p.product.equals(product._id));
      await cart.save();
      res.send("Produit retiré du panier 🧺");
    } else {
      item.quantity -= 1;
      await cart.save();
      res.send("Quantité diminuée dans le panier 🌿");
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ❌ Vider complètement le panier
route.put("/empty-cart/:id", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) return res.status(404).send("Panier introuvable !");
    
    cart.products = [];
    await cart.save();
    res.send("Votre panier Zinzawa a été vidé avec succès 🧼🧺");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default route;
