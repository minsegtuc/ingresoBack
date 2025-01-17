import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Pregunta = sequelize.define('pregunta', {
    id_pregunta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    numero: {
        type: DataTypes.STRING(3)
    },
    correcta: {
        type: DataTypes.INTEGER
    },
    incorrecta: {
        type: DataTypes.INTEGER
    },
    examen_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'examen',
            key: 'id_examen'
        }
    }
}, {
    tableName: 'pregunta',
    timestamps: false
})

export default Pregunta;