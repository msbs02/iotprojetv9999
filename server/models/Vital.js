const mongoose = require('mongoose');

const vitalSchema = new mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient', // Référence au modèle Patient
    required: true,
  },
  frequence_cardiaque: { type: Number, required: true },
  temperature: { type: Number, required: true },
  spo2: { type: Number, required: true }, // Saturation en oxygène
  date_mesure: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Vital', vitalSchema);
