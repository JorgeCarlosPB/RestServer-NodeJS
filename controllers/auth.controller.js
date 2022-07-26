import { response } from "express";
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

import {Usuario} from '../models/usuario.js'
import { generarJWT } from "../helpers/generar-jwt.js";


const login = async(req, res= response) =>{

    const {correo, password} = req.body

    try {
        //verificar si el email existe
        const usuario = await Usuario.findOne({correo})
        if (!usuario){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }

        //si el susuario está activo
        if (!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado:false'
            })
        }

        //verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if (!validPassword){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        //general el jwt
        const token = await generarJWT(usuario.id)

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
    
}

export{login}