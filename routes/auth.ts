import {Router} from 'express';
import { check } from 'express-validator';
import { loginUsuario } from '../controllers/auth';
import { validarCampos } from '../middlewares/validar-campos';


const router = Router();

router.post('/', [
    check('user', 'El usuario es obligatorio').not().isEmpty(),
    check('password', 'La clave es obligatorio').isLength({ min: 5 }),
    validarCampos
],loginUsuario );

export default router;
