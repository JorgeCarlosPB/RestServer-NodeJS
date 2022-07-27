import {Router} from 'express'
import {check} from 'express-validator'

import { validarJWT } from '../midlewares/validar-jwt.js'
import {validarCampos} from '../midlewares/validar-campos.js'
import { categoriasGet, crearCategoria } from '../controllers/categorias.controller.js'
import { existeCategoriaPorId } from '../helpers/db-validators.js'

const router = Router()


router.get('/',categoriasGet)


//Obteneer todas las categorias -public
router.get('/',(req, res)=>{
    res.json('GET')
})

//obtener una categoria por id - publico
router.get('/:id',[
    check('id').custom(existeCategoriaPorId)
],(req, res)=>{
    res.json('GET id')
})

//Crear categoria -privado - cualquier persona con un token valido
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria)

//Actualizar - privado - cualquiera con token válido
router.put('/:id',(req, res)=>{
    res.json('Put')
})

//borrar una categoria -admin
router.delete('/:id',(req, res)=>{
    res.json('delete, cambiar el estado')
})

export{
    router
}