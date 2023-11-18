from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

usuarios = [
    {
        "id": 1,
        "user": "juan.pulgar",
        "password": "juan.pulgar1",
        "nombre": "Juan Pulgar",
        "perfil":  1,
        "correo": "docente@gmail.com"
    },
    {
        "id": 2,
        "user": "Da.moralesf",
        "password": "da.moralesf1",
        "nombre": "Danilo Morales",
        "perfil": 2,
        "correo": "da.moralesf@duocuc.cl"
    },
    {
        "id": 3,
        "user": "agu.quezada",
        "password": "agu.quezada1",
        "nombre": "Agustín Quezada",
        "perfil": 2,
        "correo": "agu.quezada@duocuc.cl"
    },
    {
        "id": 4,
        "user": "a",
        "password": "a",
        "nombre": "Pruebas",
        "perfil": 2,
        "correo": "a@a.cl"
    }
]

secciones = [
    {
        "id": 1,
        "nombre": "Juan Pulgar",
        "cursos": [
            {
                "id": 1,
                "nombre": "Programacion de Aplicaciones Moviles",
                "codigo": "PGY4121-003D",
                "alumnos": [
                    {"id": 1, "nombre": "Danilo Morales"},
                    {"id": 2, "nombre": "Agustín Quezada"}
                ]
            }
        ]
    }
]

""" Validaciones """

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


@app.route('/secciones', methods=['GET'])
def obtener_profesores():
    return jsonify(secciones), 200

@app.route('/secciones/<int:secciones_id>/cursos', methods=['GET'])
def obtener_cursos_profesor(secciones_id):
    profesor = next((p for p in secciones if p["id"] == secciones_id), None)
    if not profesor:
        return jsonify({"message": "Profesor no encontrado"}), 404
    return jsonify(secciones["cursos"]), 200

@app.route('/secciones/<int:secciones_id>/cursos/<int:curso_id>/alumnos', methods=['GET'])
def obtener_alumnos_curso(profesor_id, curso_id):
    profesor = next((p for p in secciones if p["id"] == profesor_id), None)
    if not profesor:
        return jsonify({"message": "Profesor no encontrado"}), 404
    curso = next((c for c in profesor["cursos"] if c["id"] == curso_id), None)
    if not curso:
        return jsonify({"message": "Curso no encontrado"}), 404
    return jsonify(curso["alumnos"]), 200

if __name__ == '__main__':
    app.run(debug=True)