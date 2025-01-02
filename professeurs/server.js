require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const profRoutes = require('./routes/ProfesseurRoute');

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
