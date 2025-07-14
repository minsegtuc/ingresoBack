import ExamenAspirante from '../model/examenAspirante.model.js';
import { registrarLog } from '../helpers/logHelpers.js';
import dotenv from 'dotenv'
import { Op, fn, col, literal } from "sequelize";
import sequelize from '../config/db.js';

dotenv.config();
const corte = process.env.CORTE

const createExamenAspirante = async (req, res) => {
    try {
        await ExamenAspirante.create({
            examen_id: req.body.examen_id,
            aspirante_dni: req.body.aspirante_dni
        });

        await registrarLog('create', 'Examen Aspirante creado', req.userId);
        res.status(200).json("examen aspirante creado");
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// const updateExamenAspirante = async (req, res) => {
//     console.log("Ingreso a cambiar la nota: " + req.body.presencia, req.body.nota, req.body.examen_id, req.body.dni);
//     try {
//         await ExamenAspirante.update({
//             presencia: req.body.presencia,
//             nota: req.body.nota
//         }, {
//             where: {
//                 examen_id: req.body.examen_id,
//                 aspirante_dni: req.body.dni
//             }
//         });

//         await registrarLog('update', 'Examen Aspirante actualizado', req.userId);

//         res.status(200).json("examen aspirante actualizado");
//     }
//     catch (error) {
//         res.status(500).json({
//             message: error.message
//         });
//     }
// }

const updateExamenAspirante = async (req, res) => {
    console.log("Ingreso a cambiar la nota: " + req.body.presencia, req.body.nota, req.body.examen_id, req.body.dni);
    try {
        const [affectedRows] = await ExamenAspirante.update({
            presencia: req.body.presencia,
            nota: req.body.nota,
            examen_id: req.body.examen_id
        }, {
            where: {
                examen_id: req.body.examen_id_actual,
                aspirante_dni: req.body.dni
            }
        });

        if (affectedRows === 0) {
            // Si no se afectaron filas, devolver un error 404 (no encontrado).
            return res.status(404).json({
                message: "No se encontró un registro con los datos proporcionados. No se realizó ningún cambio."
            });
        }

        // Registrar log solo si se afectó alguna fila
        await registrarLog('update', 'Examen Aspirante actualizado', req.userId);

        // Respuesta exitosa
        res.status(200).json("Examen aspirante actualizado");
    } catch (error) {
        console.error("Error en updateExamenAspirante:", error.message);
        res.status(500).json({
            message: error.message
        });
    }
};



const getAprobados = async (req, res) => {
    const { fecha, turno, aula, genero } = req.body;

    try {
        let query = `
            SELECT asp.*, exa.*, ea.*
            FROM examen_aspirante AS ea
            INNER JOIN examen AS exa ON exa.id_examen = ea.examen_id
            INNER JOIN aspirante AS asp ON asp.dni = ea.aspirante_dni
            WHERE ea.presencia = 1
        `;

        const replacements = {};
        if (fecha) {
            query += ` AND exa.fecha = :fecha`;
            replacements.fecha = fecha;
        }
        if (turno) {
            query += ` AND exa.turno = :turno`;
            replacements.turno = turno;
        }
        if (aula) {
            query += ` AND exa.aula = :aula`;
            replacements.aula = aula;
        }
        if (genero) {
            query += ` AND asp.genero = :genero`;
            replacements.genero = genero;
        }

        const aspirantes = await sequelize.query(query, {
            replacements,
            type: sequelize.QueryTypes.SELECT,
        });

        res.status(200).json({ aspirantes, corte: corte });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los datos." });
    }
};

const getAspiranteAll = async (req, res) => {
    const { fecha, turno, aula, busqueda, genero, condicion } = req.body;
    //console.log("Condicion: ", condicion)
    try {
        let query = `
            SELECT asp.*, exa.*, ea.*
            FROM examen_aspirante AS ea
            INNER JOIN examen AS exa ON exa.id_examen = ea.examen_id
            INNER JOIN aspirante AS asp ON asp.dni = ea.aspirante_dni
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
                query += ` AND ea.presencia = 1`;
            } else {
                query += ` AND ea.presencia = 0`;
            }
        } else {
            query += ` AND (ea.presencia = 1 OR ea.presencia = 0)`;
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

        await registrarLog('get', 'Aspirantes obtenidos', req.userId ? req.userId : "911");

        res.status(200).json({ aspirantes, corte });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los datos." });
    }
}

const getAspirante = async (req, res) => {
    console.log("Params: ", req.params.dni);
    try {
        const dni = req.params.dni;
        console.log(dni)

        const aspirantes = await ExamenAspirante.findAll({
            where: {
                aspirante_dni: dni
            },
            order: [
                ['examen_id', 'ASC']
            ],
        });
        res.status(200).json(aspirantes);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export { createExamenAspirante, updateExamenAspirante, getAprobados, getAspiranteAll, getAspirante };