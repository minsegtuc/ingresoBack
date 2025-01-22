import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Examen from "./examen.model.js";

const Aspirante = sequelize.define('aspirante', {
    dni: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING
    },
    apellido: {
        type: DataTypes.STRING
    },
    genero: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'aspirante',
    timestamps: false
});

export default Aspirante;