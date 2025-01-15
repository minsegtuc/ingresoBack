import Examen from "../model/examen.model.js";
import { registrarLog } from '../helpers/logHelpers.js';

const createExamen = async (req, res) => {
    try {
        await Examen.create({
            fecha: req.body.fecha,
            turno: req.body.turno,
            aula: req.body.aula,
            estado: req.body.estado,
            cantidad_inscriptos: req.body.cantidad_inscriptos
        });

        await registrarLog('create', 'Examen creado', req.userId);
        res.status(200).json("examen creado");
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const updateExamen = async (req, res) => {
    console.log(req.body)
    try {
        await Examen.update({
            fecha: req.body.fecha,
            turno: req.body.turno,
            aula: req.body.aula,
            estado: req.body.estado,
            cantidad_inscriptos: req.body.cantidad_inscriptos
        }, {
            where: {
                id_examen: req.params.id_examen
            }
        });

        await registrarLog('update', 'Examen actualizado', req.userId);

        res.status(200).json("examen actualizado");
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const getEstado = async (req, res) => {
    try {
        const estadoExamenes = await Examen.findAll();
        res.status(200).json(estadoExamenes);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getExamen = async (req, res) => {
    try {
        const examen = await Examen.findOne({
            where: {
                fecha: req.body.fecha,
                turno: req.body.turno,
                aula: req.body.aula,
            }
        });
        res.status(200).json(examen);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


export { createExamen, updateExamen, getEstado, getExamen };