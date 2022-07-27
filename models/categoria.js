// import { Schema, model } from "mongoose";
import pkg from 'mongoose'

const {Schema, model} = pkg

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true 
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
})

const Categoria = model('Categoria',CategoriaSchema)

export{Categoria}
