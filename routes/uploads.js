import { Router } from "express";
import { validarCampos } from "../midlewares/validar-campos.js";
import {check} from "express-validator";
import { actualizarImagen, actualizarImagenCloudinary, cargarArchivo, mostrarImagen } from "../controllers/uploads.controller.js";
import { coleccionesPermitidas } from "../helpers/db-validators.js";
import { validarArchivoSubir } from "../midlewares/validar-archivo.js";


const router = Router()

//Aquí llamamos a todos los métodos del controlador
router.post('/',validarArchivoSubir, cargarArchivo)

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagenCloudinary)
// ], actualizarImagen)

router.get('/:coleccion/:id', [
    check('id', 'El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen)

export {router}