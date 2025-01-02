const express = require('express');
const router = express.Router();
const profController = require('../controllers/ProfesseurController');

// Routes pour les professeurs
router.get('/', profController.getAllProfs);
router.get('/:id', profController.getProfById);
router.post('/', profController.addProf);
router.put('/:id', profController.updateProf);
router.delete('/:id', profController.deleteProf);

module.exports = router;
