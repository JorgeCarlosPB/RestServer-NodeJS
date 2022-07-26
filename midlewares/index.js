

// import { validarCampos } from "../midlewares/validar-campos.js";
// import { validarJWT } from "../midlewares/validar-jwt.js";
// import { esAdminRole, tieneRole } from "../midlewares/validar-roles.js";

import validaCampos from "../midlewares/validar-campos.js";
import validaJWT from "../midlewares/validar-jwt.js";
import validaRoles from "../midlewares/validar-roles.js";

const validarCampos = validaCampos
const validarJWT = validaJWT
const validarRoles = validaRoles

export{
    validarCampos,
    validarJWT,
    validarRoles,
}