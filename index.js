const express = require("express");
const conectarDB = require("./config/db");
const usuarioRouters = require("./routers/usuarioRouters");
const authRouters = require("./routers/authRouters");

//conectar a la base da datos
conectarDB();

const app = express();
//habilitar express.json
app.use(express.json({ extended : true}));
//rutas o routes
app.use("/api/usuarios", usuarioRouters);
app.use("/api/auth", authRouters);

app.listen(4000, () => {
    console.log("Servidor corriendo por el puerto 4000");
});