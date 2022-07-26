import { Router } from "express";
import {check} from "express-validator";

import { validarCampos } from "../midlewares/validar-campos.js";
import { validarJWT } from "../midlewares/validar-jwt.js";
import { esAdminRole, tieneRole } from "../midlewares/validar-roles.js";

import { emailExiste, esRoleValido, existeUsuarioPorId } from "../helpers/db-validators.js";

import { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } from "../controllers/users.controller.js";

const router = Router()

//Aquí llamamos a todos los métodos del controlador
router.get('/',usuariosGet)

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe ser der màs de 6 letras').isLength({min:6}),
    check('correo','El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( (rol) => esRoleValido(rol)),
    validarCampos
], usuariosPost)

router.put('/:id',[
    check('id', 'No es un ID válid').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut)

router.patch('/',usuariosPatch)

router.delete('/:id', [
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE', 'OTRO_ROLE'),
    check('id', 'No es un ID válid').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete)

export{router}