const express = require('express');
const router = express.Router();
const Vital = require('../models/Vital');

// Récupérer toutes les constantes vitales d'un patient
// Récupérer les constantes vitales d'un patient, avec option de filtre par date
// Récupérer les constantes vitales d'un patient, avec option de filtre par date
// Récupérer toutes les constantes vitales d'un patient avec filtre par date
router.get('/:patient_id', async (req, res) => {
  const { patient_id } = req.params;
  const { since } = req.query;  // Le paramètre de filtre

  try {
    const query = { patient_id };
    if (since) {
      query.date_mesure = { $gt: new Date(since) }; // Filtrer par date
    }

    // Récupérer les données et les trier par date
    const vitals = await Vital.find(query).sort({ date_mesure: 1 });
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
