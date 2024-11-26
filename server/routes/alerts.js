const express = require('express');
const router = express.Router();
const Alert = require('../models/Alert');

// Récupérer toutes les alertes
router.get('/', async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ date_alerte: -1 }).populate('patient_id', 'nom prenom');
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des alertes.' });
  }
});

// Marquer une alerte comme résolue
router.patch('/:id', async (req, res) => {
  try {
    await Alert.findByIdAndUpdate(req.params.id, { statut: 'résolue' });
    res.json({ success: true, message: 'Alerte marquée comme résolue.' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'alerte.' });
  }
});

// Ajouter une alerte
router.post('/', async (req, res) => {
  try {
    const alert = new Alert(req.body);
    await alert.save();
    res.json({ success: true, message: 'Alerte ajoutée avec succès.' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'alerte.' });
  }
});

module.exports = router;
