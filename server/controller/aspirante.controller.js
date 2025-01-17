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
            nota: req.body.nota,
            examen_id: req.body.examen_id
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
            nota: req.body.nota,
            examen_id: req.body.examen_id
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

const getAspiranteAll = async (req, res) => {
    const { fecha, turno, aula, busqueda, genero, condicion } = req.body;
    console.log("Condicion: " , condicion)
    try {
        let query = `
            SELECT asp.*, exa.*
            FROM aspirante AS asp
            INNER JOIN examen AS exa ON exa.id_examen = asp.examen_id
            WHERE 1=1
        `;

        const replacements = {}

        if (fecha) {
            query += ` AND exa.fecha = :fecha`;
            replacements.fecha = fecha
        }
        if (turno) {
            query += ` AND exa.turno = :turno`;
            replacements.turno = turno
        }
        if (condicion) {
            if (condicion === "1") {
                query += ` AND asp.presencia = 1`;
            }else{
                query += ` AND asp.presencia = 0`;
            }
        } else {
            query += ` AND (asp.presencia = 1 OR asp.presencia = 0)`;
        }
        if (aula) {
            query += ` AND exa.aula = :aula`;
            replacements.aula = aula
        }
        if (busqueda) {
            query += ` AND (
                asp.dni LIKE :busqueda OR 
                asp.apellido LIKE :busqueda OR 
                asp.nombre LIKE :busqueda
            )`
            replacements.busqueda = `%${busqueda}%`
        }
        if (genero) {
            query += ' AND asp.genero = :genero'
            replacements.genero = genero
        }

        query += ' ORDER BY asp.apellido ASC';

        const aspirantes = await sequelize.query(query, {
            replacements,
            type: sequelize.QueryTypes.SELECT,
        });

        res.status(200).json({ aspirantes, corte });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los datos." });
    }
}

//PARA ESTADISTICAS
const getAprobados = async (req, res) => {
    const { fecha, turno, aula, genero } = req.body;

    try {
        let query = `
            SELECT asp.*, exa.*
            FROM aspirante AS asp
            INNER JOIN examen AS exa ON exa.id_examen = asp.examen_id
            WHERE asp.presencia = 1
        `;

        if (fecha) {
            query += ` AND exa.fecha = :fecha`;
        }
        if (turno) {
            query += ` AND exa.turno = :turno`;
        }
        if (aula) {
            query += ` AND exa.aula = :aula`;
        }
        if (genero) {
            query += ' AND asp.genero = :genero'
        }

        const aspirantes = await sequelize.query(query, {
            replacements: { fecha, turno, aula, genero },
            type: sequelize.QueryTypes.SELECT,
        });

        res.status(200).json({ aspirantes, corte });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los datos." });
    }
};


export { createAspirante, updateAspirante, getAspirante, getAspiranteAll, getAprobados };