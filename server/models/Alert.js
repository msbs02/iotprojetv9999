const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient', // Référence au modèle Patient
    required: true,
  },
  type_alerte: { type: String, required: true }, // Exemple : "Fréquence cardiaque élevée"
  valeur: { type: Number, required: true }, // Valeur mesurée qui déclenche l'alerte
  statut: { type: String, default: 'non résolue' }, // Statut de l'alerte : "non résolue", "résolue"
  date_alerte: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Alert', alertSchema);
