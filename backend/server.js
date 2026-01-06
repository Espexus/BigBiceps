(function () {
    const express = require("express");
    const cors = require("cors");
    const bd = require("./bd");

    const app = express();
    app.use(cors());
    app.use(express.json());

    


    app.listen(3000, () => {
        console.log("servidor corriendo en el puerto 3000 http://localhost:3000")
    })


})()