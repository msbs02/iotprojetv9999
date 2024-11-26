from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient("mongodb://localhost:27017/")
db = client['surveillance_medicale']
vitals_collection = db['constantes_vitales']

@app.route('/api/add-vitals', methods=['POST'])
def add_vitals():
    data = request.json
    vitals_collection.insert_one(data)
    return jsonify({"success": True, "message": "Données enregistrées"})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
if __name__ == '__main__':
    print("Serveur Flask démarré sur http://localhost:5001")
    app.run(debug=True, port=5001)
