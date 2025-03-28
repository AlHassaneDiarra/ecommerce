const express = require("express");
const { sql } = require("../db");
const bcrypt = require("bcrypt");
const router = express.Router();

// Route d'inscription
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Chiffrer le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);
        await sql.query`INSERT INTO users (name, email, password, created_at) VALUES (${name}, ${email}, ${hashedPassword}, GETDATE())`;
        res.status(201).send("Utilisateur enregistré !");
    } catch (error) {
        res.status(500).send("Erreur lors de l'inscription: " + error.message);
    }
});

// Route de connexion (simple vérification)
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await sql.query`SELECT * FROM users WHERE email = ${email}`;
        const user = result.recordset[0];
        if (!user) return res.status(400).send("Utilisateur non trouvé");
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).send("Mot de passe incorrect");
        res.send("Connexion réussie !");
    } catch (error) {
        res.status(500).send("Erreur lors de la connexion: " + error.message);
    }
});

module.exports = router;
