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
    usuarios=[]
    for doc in db.find():
        usuarios.append({
            '_id': str(ObjectId(doc['_id'])),
            'nombre': doc['nombre'],
            'email': doc['email'],
            'password': doc['password']
        })
    return jsonify(usuarios)

@app.route('/users/<id>', methods=['GET'])
def getUserById(id):
    usuario= db.find_one({'_id': ObjectId(id)})
    return jsonify({
        '_id': str(ObjectId(usuario['_id'])),
        'nombre': usuario['nombre'],
        'email': usuario['email'],
        'password': usuario['password']
    })

@app.route('/users/<id>', methods=['DELETE'])
def deleteUser(id):
    db.delete_one({'_id': ObjectId(id)})
    return jsonify({"msg": "Usuario eliminado"}), 200

@app.route('/users/<id>', methods=['PUT'])
def updateUser(id):
    db.update_one({'_id': ObjectId(id)}, {'$set': {
        'nombre': request.json['nombre'],
        'email': request.json['email'],
        'password': request.json['password']
    }})
    return jsonify({"msg": "Usuario actualizado"}), 200

#Ejecuta App
if __name__ == '__main__':
    app.run(debug=True)
