const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

router.get('/', async (req, res) => {
  const patients = await Patient.find();
  res.json(patients);
});

router.post('/', async (req, res) => {
  const patient = new Patient(req.body);
  await patient.save();
  res.json({ success: true });
});

module.exports = router;
