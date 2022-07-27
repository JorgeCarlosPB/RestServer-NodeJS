
import { Categoria } from "../models/categoria.js"
import { Role } from "../models/role.js"
import {Usuario} from '../models/usuario.js'

const esRoleValido = async(rol = '') =>{
    const existeRol = await Role.findOne({rol})
    if(!existeRol){
        throw new Error(`El rol ${rol} no está registrado en la BD`)
    }
}

const emailExiste = async(correo = '')=>{
    //Obtener el email
    const existeEmail = await Usuario.findOne({correo})
    if(existeEmail){
        throw new Error(`El correo: ${correo} ya está siendo utilizado por alguien más`)
    }
}

const existeUsuarioPorId = async(id)=>{
    //Verificar si existe el usuario por id
    const existeUsuario= await Usuario.findById(id)
    if(!existeUsuario){
        throw new Error(`El id: ${id} no existe`)
    }
}

const existeCategoriaPorId = async(id)=>{
    //Verificar si existe el usuario por id
    const existeCategoria= await Categoria.findById(id)
    if(!existeCategoria){
        throw new Error(`El id: ${id} de la categoria no existe`)
    }
}


export { esRoleValido, emailExiste, existeUsuarioPorId, existeCategoriaPorId}