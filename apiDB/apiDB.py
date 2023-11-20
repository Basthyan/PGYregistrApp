from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

profesores = [
    {
        "id": 1,
        "nombre": "Juan Pulgar",
        "cursos": [
            {
                "id": 1,
                "nombre": "Programacion de Aplicaciones Moviles",
                "codigo": "PGY4121",
                "seccion": "003D",
                "alumnos": []
            }
        ]
    }
]


usuarios = [
    {
        "id": 1,
        "user": "juanPulgar",
        "password": "JuanP1",
        "nombre": "Juan Pulgar",
        "perfil":  1,
        "correo": "profesor@duocuc.cl"
    },
    {
        "id": 2,
        "user": "daniloMorales",
        "password": "Dani01",
        "nombre": "Danilo Morales",
        "perfil": 2,
        "correo": "alumno@duocuc.cl"
    },
    {
        "id": 3,
        "user": "a",
        "password": "a",
        "nombre": "Pruebas",
        "perfil": 2,
        "correo": "alumno@duocuc.cl"
    },
    {
        "id": 4,
        "user": "aguQuezada",
        "password": "aguQuezada1",
        "nombre": "Agustin Quezada",
        "perfil": 2,
        "correo": "alumno@duocuc.cl"
    }
]


@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('user')
    password = request.json.get('password')
    
    usuario = next((u for u in usuarios if u["user"] == username and u["password"] == password), None)
    
    if usuario:
        return jsonify({
            "id": usuario["id"],
            "nombre": usuario["nombre"],
            "user": usuario["user"],
            "correo": usuario["correo"],
            "tipoPerfil": usuario["perfil"]
        }), 200
    else:
        return jsonify({"message": "Credenciales incorrectas"}), 401


@app.route('/profesores', methods=['GET'])
def obtener_profesores():
    return jsonify(profesores), 200

@app.route('/profesores/<int:profesor_id>/cursos', methods=['GET'])
def obtener_cursos_profesor(profesor_id):
    profesor = next((p for p in profesores if p["id"] == profesor_id), None)
    if not profesor:
        return jsonify({"message": "Profesor no encontrado"}), 404
    return jsonify(profesor["cursos"]), 200

@app.route('/profesores/<int:profesor_id>/cursos/<int:curso_id>/alumnos', methods=['GET'])
def obtener_alumnos_curso(profesor_id, curso_id):
    profesor = next((p for p in profesores if p["id"] == profesor_id), None)
    if not profesor:
        return jsonify({"message": "Profesor no encontrado"}), 404
    curso = next((c for c in profesor["cursos"] if c["id"] == curso_id), None)
    if not curso:
        return jsonify({"message": "Curso no encontrado"}), 404
    return jsonify(curso["alumnos"]), 200

if __name__ == '__main__':
    app.run(debug=True)
