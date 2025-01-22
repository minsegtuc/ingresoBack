import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ExamenAspirante = sequelize.define('examen_aspirante', {
    id_examen_aspirante: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
        },
        nullable: false
    },
    aspirante_dni: {
        type: DataTypes.INTEGER,
        references: {
            model: 'aspirante',
            key: 'dni'
        },
        nullable: false
    }
}, {
    tableName: 'examen_aspirante',
    timestamps: false
});

export default ExamenAspirante;