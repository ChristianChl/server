import express, {Application} from 'express';
import userRoutes from '../routes/usuario';
import authRoutes from '../routes/auth';
import cors from 'cors';
import db from '../database/connection';
import path from 'path';
import { Request, Response } from "express";

class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        usuario: '/api/usuario',
        auth: '/api/auth',
    }
    


    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3000';

        //Métodos Iniciales
        this.dbConnnection();
        this.middlewares();
        this.routes();
        this.getRoutes();
    }
    //TODO: Conectar base de datos

    async dbConnnection(){
        try {

            await db.authenticate();
            console.log('Database Online');
            
        } catch (error: any) {

            throw new Error(error);
            
        }
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //Lectura del body
        this.app.use(express.json());

        //Carpeta pública
        this.app.use(express.static('public'));

    }

    routes(){
        this.app.use(this.apiPaths.usuario, userRoutes);
        this.app.use(this.apiPaths.auth, authRoutes);

    }

    //Manejar demas rutas
    getRoutes(){
        this.app.get('*', (req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname, '../public/index.html'));
        })
    }
    
    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto  ' + this.port);
        })
    }
}

export default Server;