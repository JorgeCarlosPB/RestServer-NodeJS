import { request, response } from "express";
import { Categoria } from "../models/categoria.js";


//Obtener Categorias -paginado -total -populate
const obtenerCategorias = async(req = request, res = response) =>{
    const {limite = 5, desde = 0} = req.query
    const query = {estado:true}
    const [total, categorias] = await Promise.all([
        Categoria.count(query),
        Categoria.find(query)
            .skip(Number(desde))
            .limit( Number(limite))
    ])
    res.json({
        total,
        categorias
    })
}


//Obtener Categoria - populate{}


const crearCategoria = async(req, res = response)=>{
    const nombre  = req.body.nombre.toUpperCase()
    console.log(nombre)

    const categoriaDB = await Categoria.findOne({nombre})

    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        })
    }

    //Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data)
    //Guardar en la DB
    await categoria.save()

    res.status(201).json(categoria)
}

//Actualizar categoria

//Borrar categoria - estado:false

export{
    crearCategoria,
    obtenerCategorias
}