from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson.json_util import dumps
from bson.objectid import ObjectId

# Initialiser l'application Flask
app = Flask(__name__)

# Connexion à MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client['surveillance_medicale']  # Nom de la base de données
vitals_collection = db['vitals']  # Nom de la collection

# Route pour récupérer les données vitales par patient
@app.route('/api/vitals/<patient_id>', methods=['GET'])
def get_vitals(patient_id):
    vitals = vitals_collection.find({"patient_id": patient_id}).sort("date_mesure", -1).limit(50)  # Dernières 50 entrées
    return dumps(vitals), 200

# Route API pour recevoir les données
@app.route('/api/add-vitals', methods=['POST'])
def add_vitals():
    data = request.json
    vitals_collection.insert_one(data)
    return jsonify({"success": True, "message": "Données enregistrées"})

# Lancer le serveur Flask
if __name__ == '__main__':
    print("Serveur Flask démarré sur http://0.0.0.0:5001")
    app.run(debug=True, port=5001, host="0.0.0.0")
