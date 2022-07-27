import { Router } from "express";
import { validarCampos } from "../midlewares/validar-campos.js";
import {check} from "express-validator";
import { googleSignIn, login } from "../controllers/auth.controller.js";

const router = Router()

//Aquí llamamos a todos los métodos del controlador
router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
]
,login)

router.post('/google',[
    check('id_token', 'id_token es necesario').not().isEmpty(),
    validarCampos
]
,googleSignIn)

export {router}