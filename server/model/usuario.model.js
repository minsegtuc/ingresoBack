import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import bcrypt from 'bcrypt';

const Usuario = sequelize.define('usuario', {
    id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    apellido: {
        type: DataTypes.STRING
    },
    user_name: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    },
    rol: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'usuario',
    timestamps: false,
    hooks: {
        beforeCreate: (usuario) => {
            usuario.password = bcrypt.hashSync(usuario.password, 10);
        },
        beforeUpdate: (usuario) => {
            if (usuario.changed('contraseña')) {
                usuario.password = bcrypt.hashSync(usuario.password, 10);
                console.log('Contraseña encriptada:', usuario.password);
            }
        },
    }
});

export default Usuario;