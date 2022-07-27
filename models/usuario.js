//import { Schema, model } from "mongoose";
import pkg from 'mongoose'
const {Schema, model} = pkg
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo:{
        type:String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type:String,
        required: [true, 'La contraseña es obligatorio']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        default:'USER_ROLE',
        emun:['ADMIN_ROLE','USER_ROLE']
    },
    estado:{
        type: Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default: false,
    }

})


UsuarioSchema.methods.toJSON = function (){
    const {__v, password,_id, ...usuario} = this.toObject()
    usuario.uid = _id
    return usuario
}

const Usuario= model('Usuario',UsuarioSchema)

export{ Usuario}