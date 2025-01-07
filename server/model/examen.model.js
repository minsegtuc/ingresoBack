import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Examen = sequelize.define('examen', {
    id_examen: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATEONLY
    },
    turno: {
        type: DataTypes.STRING
    },
    aula: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    },
    cantidad_inscriptos: {
        type: DataTypes.INTEGER
    },
}, {
    tableName: 'examen',
    timestamps: false
});

export default Examen;