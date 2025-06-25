import express from "express";
import User from "../models/user.js";
import Cart from "../models/cart.js";

const route = express.Router();

// 👥 Obtenir tous les utilisateurs
route.get("/", async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json({ message: "Aucun utilisateur enregistré pour l’instant." });
    }
    res.json(users);
  } catch (err) {
    console.error("Erreur lors de la récupération des utilisateurs :", err);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

// 👤 Obtenir un utilisateur par ID
route.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable." });
    res.json(user);
  } catch (err) {
    console.error("Erreur lors de la récupération de l’utilisateur :", err);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

// 🧵 Créer un nouvel utilisateur + panier vide automatiquement
route.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);

    const cart = new Cart({
      userId: newUser._id
    });
    await cart.save();

    newUser.cartId = cart._id;
    await newUser.save();

    res.status(201).json({
      message: "Bienvenue chez Zinzawa 🌞 Votre compte a bien été créé.",
      user: newUser
    });
  } catch (err) {
    console.error("Erreur lors de la création de l’utilisateur :", err);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

// 🖋️ Modifier les informations d’un utilisateur
route.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }
    res.json({
      message: "Profil mis à jour avec succès 🌿",
      user: updatedUser
    });
  } catch (err) {
    console.error("Erreur lors de la mise à jour :", err);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

// ❌ Supprimer un utilisateur
route.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }
    res.json({ message: "Compte supprimé avec succès." });
  } catch (err) {
    console.error("Erreur lors de la suppression :", err);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

export default route;
