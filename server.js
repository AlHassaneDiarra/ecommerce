const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectToDB } = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connexion à la base de données
connectToDB();

// Importer les routes
const productRoutes = require("./routes/products");
const userRoutes = require("./routes/users");

// Utiliser les routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// Route de base
app.get("/", (req, res) => {
    res.send("Bienvenue sur l'API e-commerce !");
});

app.listen(PORT, () => {
    console.log(`✅ Serveur lancé sur le port ${PORT}`);
});
