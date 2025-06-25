import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import authRoute from "./routes/authRoute.js";

dotenv.config();

const app = express();

// 🌿 Connexion à la base de données
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connexion à la base de données réussie 🌿"))
  .catch(err => console.error("❌ Échec de connexion à la base de données :", err));

// 🧺 Middlewares
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[Zinzawa] ${req.method} ${req.path}`);
  next();
});

// 🌊 Route d’accueil
app.get("/", (req, res) => {
  res.send("🌞 Bienvenue sur le serveur Zinzawa – là où la Méditerranée s’habille avec élégance.");
});

// 📦 Routes principales
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/auth", authRoute);

// 🧭 Gestion des chemins inconnus
app.use((req, res) => {
  res.status(404).send("🧭 Chemin ou méthode invalide. La route vers Zinzawa est ailleurs.");
});

// 🚀 Lancement du serveur
app.listen(process.env.PORT, () => {
  console.log(`🧵 Le serveur Zinzawa tourne sur : http://localhost:${process.env.PORT}`);
});
