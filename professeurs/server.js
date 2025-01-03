require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const profRoutes = require('./routes/ProfesseurRoute');
const client = require("./config/eureka.config");
const app = express();

// Connexion à MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/profs', profRoutes);

// Port d'écoute
const PORT = process.env.PORT || 8084;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

client.start((error) => {
    if (error) {
        console.error("Erreur lors de l’enregistrement sur Eureka:", error);
    } else {
        console.log("Service enregistré sur Eureka avec succès!");
    }
});