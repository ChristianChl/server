"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../controllers/auth");
const validar_campos_1 = require("../middlewares/validar-campos");
const router = express_1.Router();
router.post('/', [
    express_validator_1.check('user', 'El usuario es obligatorio').not().isEmpty(),
    express_validator_1.check('password', 'La clave es obligatorio').isLength({ min: 5 }),
    validar_campos_1.validarCampos
], auth_1.loginUsuario);
exports.default = router;
//# sourceMappingURL=auth.js.map