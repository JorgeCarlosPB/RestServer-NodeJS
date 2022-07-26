import express from 'express'
// import { Request, Response, Aplication } from 'express'
// import express = require('express')
import cors from 'cors'
import 'dotenv/config'
import fileUpload from 'express-fileupload'

import {router as auth} from '../routes/auth.js'
import {router as user} from '../routes/user.js'
import {router as categoria} from '../routes/categorias.js'
import {router as buscar} from '../routes/buscar.js'
import {router as producto} from '../routes/productos.js'
import {router as uploads} from '../routes/uploads.js'
import { dbConnection } from '../database/config.js'

export class Server{
    constructor(){   
        this.app = express()
        this.port = process.env.PORT

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos:'/api/productos',
            usuarios: '/api/usuarios',
            uploads: '/api/uploads'
        }

        //Conectar a la base de datos
        this.conectarDB()

        //Middlewares
        this.middlewares()

        //rutas de mi aplicación
        this.routes()
    }
    async conectarDB(){
        await dbConnection()
    }

    middlewares(){
        //CORS
        this.app.use(cors())

        //Lectura y parseo de body
        this.app.use(express.json())

        //directorio publico
        this.app.use(express.static('public'))

        //Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes(){
        this.app.use(this.paths.auth, auth)
        this.app.use(this.paths.buscar, buscar)
        this.app.use(this.paths.categorias, categoria)
        this.app.use(this.paths.productos, producto)
        this.app.use(this.paths.usuarios, user)
        this.app.use(this.paths.uploads, uploads)
    }

    listen(){        
        this.app.listen(this.port,()=>{
            console.log('servidor corriendo en el puerto', this.port)
        })
    }
 }