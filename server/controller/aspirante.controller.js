import Aspirante from "../model/aspirante.model.js";
import Examen from "../model/examen.model.js";
import { registrarLog } from '../helpers/logHelpers.js';
import { Op, fn, col, literal } from "sequelize";
import dotenv from 'dotenv'
import sequelize from '../config/db.js';

dotenv.config();
const corte = process.env.CORTE

const createAspirante = async (req, res) => {
    //console.log("Aspirante: ", req.body);   
    try {
        await Aspirante.create({
            dni: req.body.dni,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            genero: req.body.genero,
        });
        res.status(200).json("aspirante creado");
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const updateAspirante = async (req, res) => {
    //console.log(req)
    try {
        await Aspirante.update({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            genero: req.body.genero,
            presencia: req.body.presencia,
        }, {
            where: {
                dni: req.params.dni
            }
        });

        await registrarLog('update', 'Aspirante actualizado', req.userId);

        res.status(200).json("aspirante actualizado");
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

//SE PUEDE USAR EN EL NUEVO CONTROLADOR DEL NUEVO MODELO
const getAspirante = async (req, res) => {
    console.log("Params: ", req.params.dni);
    try {
        const dni = req.params.dni;

        const aspirantes = await Aspirante.findAll({
            where: {
                dni: {
                    [Op.like]: `${dni}%`
                }
            },
            order: [
                ['apellido', 'ASC']
            ]
        });
        res.status(200).json(aspirantes);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export { createAspirante, updateAspirante, getAspirante };