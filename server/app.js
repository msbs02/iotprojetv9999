const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialiser l'application Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/surveillance_medicale', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connecté avec succès'))
  .catch((err) => console.error('❌ Erreur de connexion à MongoDB :', err));

// Importer les routes
const patientRoutes = require('./routes/patients');
const vitalRoutes = require('./routes/vitals');
const alertRoutes = require('./routes/alerts');
const authRoutes = require('./routes/auth');

// Routes principales
app.use('/api/patients', patientRoutes);
app.use('/api/vitals', vitalRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/auth', authRoutes);

// Route par défaut pour "/"
app.get('/', (req, res) => {
  res.send('Bienvenue sur le backend de Surveillance Médicale !');
});

// Démarrer le serveur
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
