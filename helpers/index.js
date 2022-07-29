
import * as dbValidator from './db-validators.js'
import * as genJWT from './generar-jwt.js'
import * as googVerify from './google-verify.js'
import * as subirArchivo from './subir-archivo.js'

const dbvalidators = dbValidator
const generarJWT = genJWT
const googleVerify = googVerify



export{
    dbvalidators,
    generarJWT,
    googleVerify,
    subirArchivo 
}
