import { Request, Response } from "express";
import Usuario from '../models/usuario';
import bcrypt from "bcrypt";

export const getUsuarios = async (req: Request, res: Response) => {

    const usuarios = await Usuario.findAll();
    res.json({ usuarios });

}

export const postUsuario = async (req: Request, res: Response) => {
    const { body } = req;
    try {

        const existeLogin = await Usuario.findOne({
            where: {
                user: body.user.trim()
            }
        });
        if (existeLogin) {
            return res.status(400).json({
                msg: 'Ya existe el user ' + body.user
            });
        }
    
        const salt = bcrypt.genSaltSync(12);

        body.password = bcrypt.hashSync(body.password, salt);

        const usuario: any = Usuario.build(body);

        await usuario.save();


        return res.status(201).json({
            ok: true,
            usuario,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }

}
