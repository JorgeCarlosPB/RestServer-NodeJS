
import { Categoria } from "../models/categoria.js"
import { Producto } from "../models/producto.js"
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

//Categorias
const existeCategoriaPorId = async(id)=>{
    //Verificar si existe el usuario por id
    const existeCategoria= await Categoria.findById(id)
    if(!existeCategoria){
        throw new Error(`El id: ${id} de la categoria no existe`)
    }
}

//Productos
const existeProductoPorId = async(id)=>{
    //Verificar si existe el usuario por id
    const existeProducto= await Producto.findById(id)
    if(!existeProducto){
        throw new Error(`El id: ${id} del producto no existe`)
    }
}

//Validar colecciones permitidas
const coleccionesPermitidas = (coleccion = '',colecciones = [])=>{
    const incluida = colecciones.includes(coleccion)
    if(!incluida){
        throw new Error(`La colección ${coleccion} no es permitida, solo admite ${colecciones}`)
    }
    return true
}



export { 
    esRoleValido,
    emailExiste, 
    existeUsuarioPorId, 
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}