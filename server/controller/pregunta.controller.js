import Pregunta from "../model/pregunta.model.js";
import sequelize from "../config/db.js";

const createpregunta = async (req, res) => {
    try {
        await Pregunta.create({
            numero: req.body.numero,
            correcta: req.body.correcta,
            incorrecta: req.body.incorrecta,
            examen_id: req.body.examen_id
        })
        res.status(200).json('pregunta creada')
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export { createpregunta }