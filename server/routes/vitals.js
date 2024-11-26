const express = require('express');
const router = express.Router();
const Vital = require('../models/Vital');

// Récupérer toutes les constantes vitales d'un patient
router.get('/:patient_id', async (req, res) => {
  try {
    const vitals = await Vital.find({ patient_id: req.params.patient_id }).sort({ date_mesure: -1 });
    res.json(vitals);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des constantes vitales.' });
  }
});

// Ajouter une constante vitale
router.post('/', async (req, res) => {
  try {
    const vital = new Vital(req.body);
    await vital.save();
    res.json({ success: true, message: 'Constante vitale ajoutée avec succès.' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout de la constante vitale.' });
  }
});

module.exports = router;
