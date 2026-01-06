(function () {
    require("dotenv").config();

    const mysql = require("mysql2");

    const conexion = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB
    })

    conexion.connect((err) => {
        if(err){
            console.error("error en la conexion a la base de datos ", err)
        } else {
            console.log("conectado a la base de datos exitosamente")
        }
    })

    module.exports = conexion;

})()