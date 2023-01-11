import { DataTypes } from 'sequelize';
import db from "../database/connection";

const Usuario = db.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
    user: {
        type: DataTypes.STRING
    },

    password: {
        type: DataTypes.STRING
    },

    fullName: {
        type: DataTypes.STRING
    },

});

export default Usuario;
