const sql = require("mssql");
require("dotenv").config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER, // Doit être une chaîne, par ex: "hiverno-server.database.windows.net"
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT, 10),
    options: {
        encrypt: true,                // Obligatoire pour Azure SQL
        trustServerCertificate: false // Laisser false pour production
    }
};

async function connectToDB() {
    try {
        await sql.connect(config);
        console.log("✅ Connexion à la base de données réussie !");
    } catch (error) {
        console.error("❌ Erreur de connexion à la base de données", error);
    }
}

module.exports = { connectToDB, sql };
