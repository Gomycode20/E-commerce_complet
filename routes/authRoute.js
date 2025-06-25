import express from "express";
import User from "../models/user.js";

const route = express.Router();

// 🔐 Connexion utilisateur
route.post("/login", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    let user;

    if (email) {
      user = await User.findOne({ email });
    } else if (username) {
      user = await User.findOne({ username });
    } else {
      return res.status(400).json({ message: "Identifiants manquants." });
    }

    if (!user) {
      return res.status(403).json({ message: "Utilisateur introuvable." });
    }

    // Ici, tu peux comparer avec bcrypt si les mots de passe sont hashés
    if (user.password !== password) {
      return res.status(403).json({ message: "Mot de passe incorrect." });
    }

    // Connexion réussie
    res.json({
      message: `Bienvenue ${user.fullName || user.username} chez Zinzawa 🌞`,
      user
    });

  } catch (err) {
    console.error("Erreur lors de la connexion :", err);
    res.status(500).json({ message: "Une erreur est survenue côté serveur." });
  }
});

export default route;
