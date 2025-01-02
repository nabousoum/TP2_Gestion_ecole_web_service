const Prof = require('../models/Professeur');

// Récupérer tous les professeurs
exports.getAllProfs = async (req, res) => {
    try {
        const profs = await Prof.find();
        res.status(200).json(profs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Récupérer un professeur par ID
exports.getProfById = async (req, res) => {
    try {
        const prof = await Prof.findById(req.params.id);
        if (!prof) {
            return res.status(404).json({ message: 'Prof not found' });
        }
        res.status(200).json(prof);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Ajouter un nouveau professeur
exports.addProf = async (req, res) => {
    try {
        const newProf = new Prof(req.body);
        const savedProf = await newProf.save();
        res.status(201).json(savedProf);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Mettre à jour un professeur
exports.updateProf = async (req, res) => {
    try {
        const updatedProf = await Prof.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProf) {
            return res.status(404).json({ message: 'Prof not found' });
        }
        res.status(200).json(updatedProf);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer un professeur
exports.deleteProf = async (req, res) => {
    try {
        const deletedProf = await Prof.findByIdAndDelete(req.params.id);
        if (!deletedProf) {
            return res.status(404).json({ message: 'Prof not found' });
        }
        res.status(200).json({ message: 'Prof deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
