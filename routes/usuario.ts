
import {Router} from 'express';
import { check } from 'express-validator';
import {getUsuarios, postUsuario } from '../controllers/usuario';
import { validarCampos } from '../middlewares/validar-campos';

const router = Router();

router.get('/', getUsuarios);
router.post('/', [
    check('fullName', 'Los nombres son obligatorios').not().isEmpty(),
    check('user', 'El usuario es obligatorio').not().isEmpty(),
    check('password', 'La clave es obligatorio').isLength({ min: 5 }),
    validarCampos
],  postUsuario);
export default router;
