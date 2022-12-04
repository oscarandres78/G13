const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env"});

exports.autenticarUsuario = async (req, res) => {
    const { password, email } = req.body;

    try{
        //revisar que el correo este registrado
        let usuario = await Usuario.findOne({ email });

        if (!usuario){
            return res.status(400).json({ msg : "El usuario no existe"});
        }

        //validar el password
        const passwordCorrecto = await bcryptjs.compare(password, usuario.password);

        if (!passwordCorrecto){
            return res.status(404).json({ msg: "Password incorrecto"});
        }

        //si todo es correcto: crear y firmar un toque
        let payload = {
            usuario: {id : usuario.id},
        }
        //res.json(payload); me devuelve un dato
        jwt.sign(
            payload,
            process.env.SECRETA,
            {
                expiresIn: '1d', //el tiempo que quiero que dure ese token
            },
            (error, token) =>{
                if (error) throw error;
                //mensaje de ocnfirmación
                res.json({token});
            }
        );

    }catch(error){
        console.log(error);
    }
}