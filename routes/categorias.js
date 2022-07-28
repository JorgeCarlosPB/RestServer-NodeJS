import {Router} from 'express'
import {check} from 'express-validator'

import { validarJWT } from '../midlewares/validar-jwt.js'
import {validarCampos} from '../midlewares/validar-campos.js'
import { obtenerCategorias, 
        crearCategoria, 
        obtenerCategoria, 
        actualizarCategoria, 
        borrarCategoria} from '../controllers/categorias.controller.js'

import { existeCategoriaPorId } from '../helpers/db-validators.js'
import { esAdminRole } from '../midlewares/validar-roles.js'

const router = Router()


router.get('/',obtenerCategorias)


//Obteneer todas las categorias -public
router.get('/',(req, res)=>{
    res.json('GET')
})

//obtener una categoria por id - publico
router.get('/:id',[
    check('id','No es un id de Mongo Válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],obtenerCategoria)

//Crear categoria -privado - cualquier persona con un token valido
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria)

//Actualizar - privado - cualquiera con token válido
router.put('/:id',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],actualizarCategoria)

//borrar una categoria -admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id de Mongo válid').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
],borrarCategoria)

export{
    router
}