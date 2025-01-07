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
    },
    presencia: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    },
    nota: {
        type: DataTypes.INTEGER,
        nullable: true
    },
    examen_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'examen',
            key: 'id_examen'
        }
    }
}, {
    tableName: 'aspirante',
    timestamps: false
});

export default Aspirante;