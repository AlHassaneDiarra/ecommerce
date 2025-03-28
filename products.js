const express = require("express");
const { sql } = require("../db");

const router = express.Router();

// Route pour récupérer tous les produits
router.get("/", async (req, res) => {
    try {
        const result = await sql.query("SELECT * FROM products");
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send("Erreur lors de la récupération des produits: " + error.message);
    }
});

// Route pour ajouter un produit
router.post("/", async (req, res) => {
    const { name, description, price, stock } = req.body;
    try {
        // Attention aux injections SQL : ici, pour simplifier, nous utilisons une injection directe
        // En production, utilisez des requêtes paramétrées.
        await sql.query`INSERT INTO products (name, description, price, stock, created_at) VALUES (${name}, ${description}, ${price}, ${stock}, GETDATE())`;
        res.status(201).send("Produit ajouté !");
    } catch (error) {
        res.status(500).send("Erreur lors de l'ajout du produit: " + error.message);
    }
});

module.exports = router;
