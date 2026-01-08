(function () {
    const express = require("express");
    const cors = require("cors");
    const db = require("./bd");

    const app = express();
    app.use(cors());
    app.use(express.json());

    // consultar datos de los usuarios

    app.get("/api/datosUser/:idusuario", (req, res) => {
        const {idusuario} = req.params;

        if (!idusuario || isNaN(idusuario)) {
            return res.status(400).json({message: "datos inválidos"})
        }
        
        db.query("CALL datos_usuario (?)", [idusuario], (err, resultado) => {
            if (err) {
                return res.status(500).json({message: "error en la consulta a la base de datos"});
            } 
            return res.json(resultado[0])
        })
    })

    // login y registro de usuarios
    app.post("/api/login", (req, res) => {
        const {alias, clave} = req.body

        if(!alias || !clave) {
            return res.status(400).json({message: "datos inválidos"})
        }

        db.query("CALL login (?, ?)", [alias, clave], (err, resultado) => {
            if (err) {
                return res.status(500).json({message: "error en la consulta a la base de datos"});
            } else if (resultado[0].length() < 1) {
                return res.status(401).json({message: "datos de acceso inválidos"})
            }
            return res.json(resultado[0])
        })
    })

    app.get("/api/disponibilidad/:alias", (req, res) => {
        const {alias} = req.params

        if(!alias) {
            return res.status(400).json({message: "ingresa un alias válido"})
        }

        db.query("CALL disponibilidad (?)", [alias], (err, resultado) => {
            if (err) {
                return res.status(500).json({message: "error en la consulta a la base de datos"});
            } 
            return res.json({total : resultado[0].length})
        })
    })

    app.post("/api/registroUsuario", (req, res) => {
        const {alias, clave, edad, nacionalidad, bandera} = req.body

        if(!alias || !clave || !edad || !nacionalidad || !bandera) {
            return res.status(400).json({message: "datos inválidos"})
        } else if (isNaN(edad)){
            return res.status(400).json({message: "tu edad no tiene un valor válido"})
        }

        db.query("CALL registro_usuario (?, ?, ?, ?, ?)", [alias, clave, edad, nacionalidad, bandera], (err, resultado) => {
            if (err) {
                return res.status(500).json({message: "error al guardar los datos"});
            } 
            return res.json({message: "Usuario creado correctamente, ve a la pestaña de login para acceder al sistema"})
        })
    })

    // métodos para los entrenamientos 
    app.get("/api/entrenamientos", (req, res) => {
       
        db.query("SELECT usuarios.alias alias, usuarios.bandera bandera, entrenamientos.descripcion descripcion, entrenamientos.grupo grupo FROM entrenamientos INNER JOIN usuarios ON entrenamientos.idusuario = usuarios.id", (err, resultado) => {
            if (err) {
                return res.status(500).json({message: "error en la consulta a la base de datos"});
            } 
            return res.json(resultado)
        })
    })

    app.get("/api/entrenamientos/usuario/:idusuario", (req, res) => {
        const {id} = req.params

        if(!id || isNaN(id)) {
            return res.status(400).json({message: "ingresa un alias válido"})
        }

        db.query("CALL consultar_entrenamientos_usuario (?)", [id], (err, resultado) => {
            if (err) {
                return res.status(500).json({message: "error en la consulta a la base de datos"});
            } 
            return res.json({total : resultado[0].length, datos: resultado[0]})
        })
    })

    app.post("/api/registrarEntreno", (req,res) => {
        const {descripcion, grupo, usuario} = req.body;

        if(!descripcion || !grupo || !usuario) {
            return res.status(400).json({message: "datos inválidos o vacíos"})
        } else if (isNaN(usuario)){
            return res.status(400).json({message: "tu id de usuario no tiene un valor válido"})
        }

        db.query("CALL registro_entreno (?, ?, ?)", [descripcion, grupo, usuario], (err, resultado) => {
            if (err) {
                return res.status(500).json({message: "error en la consulta a la base de datos"});
            }
            return res.json({message: "Entrenamiento registrado correctamente"})
        })
    })

    


    app.listen(3000, () => {
        console.log("servidor corriendo en el puerto 3000 http://localhost:3000")
    })


})()