"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const usuario_1 = require("../controllers/usuario");
const validar_campos_1 = require("../middlewares/validar-campos");
const router = express_1.Router();
router.get('/', usuario_1.getUsuarios);
router.post('/', [
    express_validator_1.check('fullName', 'Los nombres son obligatorios').not().isEmpty(),
    express_validator_1.check('user', 'El usuario es obligatorio').not().isEmpty(),
    express_validator_1.check('password', 'La clave es obligatorio').isLength({ min: 5 }),
    validar_campos_1.validarCampos
], usuario_1.postUsuario);
exports.default = router;
//# sourceMappingURL=usuario.js.map