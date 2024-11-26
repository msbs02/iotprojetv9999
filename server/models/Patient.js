const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  age: Number,
  sexe: String,
});

module.exports = mongoose.model('Patient', patientSchema);
