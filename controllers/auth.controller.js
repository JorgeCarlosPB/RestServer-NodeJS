import {request, response } from "express";
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

import {Usuario} from '../models/usuario.js'
import { generarJWT } from "../helpers/generar-jwt.js";
import { googleVerify } from "../helpers/google-verify.js";


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

const googleSignIn = async(req= request, res = response) =>{
    const {id_token} = req.body

    try {

        //const googleUser = await googleVerify(id_token)
        const {correo, nombre, img} = await googleVerify( id_token)

        let usuario = await Usuario.findOne({correo})

        if(!usuario){
            //Tengo que crearlo
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                rol:'ADMIN_ROLE',
                google: true
            }
            usuario = new Usuario(data)
            console.log(usuario)
            await usuario.save()

        }

        //Si el usuario en DB
        if (!usuario.estado){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            })
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id)

        
        res.json({
            usuario,
            token
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
        
    }

}

export{login, googleSignIn}