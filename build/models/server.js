"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuario_1 = __importDefault(require("../routes/usuario"));
const auth_1 = __importDefault(require("../routes/auth"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../database/connection"));
const path_1 = __importDefault(require("path"));
class Server {
    constructor() {
        this.apiPaths = {
            usuario: '/api/usuario',
            auth: '/api/auth',
        };
        this.app = express_1.default();
        this.port = process.env.PORT || '3000';
        //Métodos Iniciales
        this.dbConnnection();
        this.middlewares();
        this.routes();
        this.getRoutes();
    }
    //TODO: Conectar base de datos
    dbConnnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Database Online');
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    middlewares() {
        //CORS
        this.app.use(cors_1.default());
        //Lectura del body
        this.app.use(express_1.default.json());
        //Carpeta pública
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.usuario, usuario_1.default);
        this.app.use(this.apiPaths.auth, auth_1.default);
    }
    //Manejar demas rutas
    getRoutes() {
        this.app.get('*', (req, res) => {
            res.sendFile(path_1.default.resolve(__dirname, '../public/index.html'));
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto  ' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map