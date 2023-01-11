import { Request, Response } from "express";
import Usuario from '../models/usuario';
import bcrypt from "bcrypt";


export const loginUsuario = async (req: Request, res: Response) => {

    const { body } = req;
    try {

        const usuario: any = await Usuario.findOne({
            where: {
                user: body.user
            }
        });

        if (!usuario) {
            return res.status(400).json({
                msg: 'El usuario no existe: ' + body.user
            });

        }

        const validPassword = bcrypt.compareSync(body.password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'El password no es valido'
            });
        }


        // Respuesta del servicio

        return res.json({
            ok: true,
            name: usuario.fullName,
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }

}

