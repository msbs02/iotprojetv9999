const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// Route to get all patients
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching patients' });
  }
});

// Route to get a specific patient by ID
router.get('/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching patient' });
  }
});

// Route to add a new patient
router.post('/', async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.json({ success: true, patient });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error saving patient' });
  }
});

module.exports = router;
