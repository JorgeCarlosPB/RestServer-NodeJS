import { response, request } from "express"
import bcryptjs from 'bcryptjs'

import {Usuario} from '../models/usuario.js'

const usuariosGet = async(req = request, res = response) => {
    // const {q,nombre, edad} = req.query

    const {limite = 5, desde = 0} = req.query
    const query = {estado:true}
    
    const [total, usuarios] = await Promise.all([
        Usuario.count(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit( Number(limite))
    ])

    res.json({
        total,
        usuarios
    })
}

const usuariosPost = async(req, res = response) => {
    
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol})

    // Encriptar la contraseá
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt)

    //Guardar en la base de datos
    await usuario.save()
    res.json({   
        usuario
    })
}

const usuariosPut = async(req, res = response) => {

    const {id} = req.params
    const {_id, password, google,correo, ...resto} = req.body

    //Todo: validar contra base de datos
    if(password){
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json({
        usuario
    })
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API -desde el controlador'
    })
}

const usuariosDelete = async(req, res = response) => {
    const {id} = req.params
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false})
    res.json(usuario)
}

export {usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch}