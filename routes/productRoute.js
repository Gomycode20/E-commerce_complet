import express from "express";
import Product from "../models/product.js";

const route = express.Router();

// 🌿 Obtenir tous les produits (avec filtres possibles via req.query)
route.get("/", async (req, res) => {
  try {
    const products = await Product.find(req.query);
    if (products.length === 0) {
      return res.status(404).json({ message: "Aucun vêtement n’est disponible pour le moment 🌿" });
    }
    res.json(products);
  } catch (err) {
    console.error("Erreur lors du fetch des produits :", err);
    res.status(500).json({ message: "Erreur serveur lors du chargement des produits." });
  }
});

// 🌊 Obtenir un produit par ID
route.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Produit introuvable 🧵" });
    res.json(product);
  } catch (err) {
    console.error("Erreur lors du fetch du produit :", err);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

// 🧵 Ajouter un nouveau produit (admin ou artisan)
route.post("/", async (req, res) => {
  try {
    const newProd = new Product(req.body);
    await newProd.save();
    res.status(201).json({
      message: "Nouveau vêtement ajouté à la collection Zinzawa 🧺",
      product: newProd
    });
  } catch (err) {
    console.error("Erreur lors de la création d’un produit :", err);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

// ✨ Modifier un produit existant
route.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }
    res.json({
      message: "Produit mis à jour avec succès ✨",
      product: updatedProduct
    });
  } catch (err) {
    console.error("Erreur lors de la mise à jour :", err);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

// ❌ Supprimer un produit
route.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Produit introuvable" });
    }
    res.json({ message: "Produit supprimé avec succès 🧼" });
  } catch (err) {
    console.error("Erreur lors de la suppression :", err);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

export default route;

