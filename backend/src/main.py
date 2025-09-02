from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from flask_cors import CORS

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/pythonreactdb'
mongo= PyMongo(app) #Conexión a mongodb

db= mongo.db.users #Seleccionar la base de datos y la colección users

#Rutas
@app.route('/')
def index():
    return "Hola Mundo"

@app.route('/users', methods=['POST'])
def createUser():
    id= db.insert_one({
        'nombre': request.json['nombre'],
        'email': request.json['email'],
        'password': request.json['password']
    })
    
    print(str(id.inserted_id))

    return jsonify({"id": str(id.inserted_id)}), 201

@app.route('/users', methods=['GET'])
def getUser():
    return "Buscar usuario GET"

@app.route('/users/<id>', methods=['GET'])
def getUserById():
    return "Buscar usuario GET por ID"

@app.route('/users/<id>', methods=['GET'])
def deleteUser():
    return "Borrar usuario GET"

@app.route('/users/<id>', methods=['PUT'])
def updateUser():
    return "Actualiza usuario PUT"

#Ejecuta App
if __name__ == '__main__':
    app.run(debug=True)
