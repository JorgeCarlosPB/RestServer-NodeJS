import {Router} from 'express'
import {check} from 'express-validator'
import { crearProducto,
         obtenerProductos,
         obtenerProducto,
         actualizarProducto,
         borrarProducto
        } from '../controllers/productos.controller.js'

import { validarJWT } from '../midlewares/validar-jwt.js'
import {validarCampos} from '../midlewares/validar-campos.js'
// import { obtenerCategorias, 
//         crearCategoria, 
//         obtenerCategoria, 
//         actualizarCategoria, 
//         borrarCategoria} from '../controllers/categorias.controller.js'

import { existeCategoriaPorId, existeProductoPorId, existeUsuarioPorId } from '../helpers/db-validators.js'
import { esAdminRole } from '../midlewares/validar-roles.js'
// import { esAdminRole } from '../midlewares/validar-roles.js'

const router = Router()


router.get('/',obtenerProductos)

//obtener una categoria por id - publico
router.get('/:id',[
    check('id','No es un id de Mongo Válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],obtenerProducto)

//Crear categoria -privado - cualquier persona con un token valido
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
],crearProducto)

// //Actualizar - privado - cualquiera con token válido
router.put('/:id',[
    validarJWT,
    //check('categoria', 'No es un id de Mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],actualizarProducto)

//borrar una categoria -admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id de Mongo válid').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
],borrarProducto)

export{
    router
}