import express from 'express'
// import { Request, Response, Aplication } from 'express'
// import express = require('express')
import cors from 'cors'
import 'dotenv/config'
import {router as auth} from '../routes/auth.js'
import {router as user} from '../routes/user.js'
import { dbConnection } from '../database/config.js'

export class Server{
    constructor(){   
        this.app = express()
        this.port = process.env.PORT
        this.authPath = '/api/auth'
        this.usuariosPath = '/api/usuarios'

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
    }

    routes(){
        this.app.use(this.authPath, auth)
        this.app.use(this.usuariosPath, user)
        
    }

    listen(){        
        this.app.listen(this.port,()=>{
            console.log('servidor corriendo en el puerto', this.port)
        })
    }
 }