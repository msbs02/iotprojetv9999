const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Inscription
router.post('/register', async (req, res) => {
  try {
    console.log('Requête reçue:', req.body);
    const hashedPassword = await bcrypt.hash(req.body.mot_de_passe, 10);
    console.log('Mot de passe haché:', hashedPassword);
    const user = new User({
      nom: req.body.nom,
      email: req.body.email,
      mot_de_passe: hashedPassword,
      role: req.body.role,
    });
    await user.save();
    console.log('Utilisateur enregistré:', user);
    res.json({ success: true, message: 'Utilisateur enregistré avec succès.' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }
    console.error('Erreur:', err);
    res.status(500).json({ message: 'Erreur lors de l\'enregistrement de l\'utilisateur.' });
  }
});

// Connexion


// Route pour la connexion
router.post('/login', async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;

    // Vérifiez si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'Utilisateur non trouvé.' });

    // Vérifiez le mot de passe
    const isPasswordValid = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!isPasswordValid) return res.status(401).json({ success: false, message: 'Mot de passe incorrect.' });

    res.json({ success: true, message: 'Connexion réussie.', user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
  }
});



module.exports = router;
