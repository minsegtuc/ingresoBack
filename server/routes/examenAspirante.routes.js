import express from 'express';
import { updateAspirante, createExamenAspirante, updateExamenAspirante, getAprobados, getAspiranteAll, getAspirante, getAspiranteAllFiltros} from '../controller/examenAspirante.controller.js';

const router = express.Router();
router.post('/aprobados', getAprobados)
router.post('/examenAspirante', createExamenAspirante);
router.post('/aspirantes', getAspiranteAll);
router.post('/aspirantesFiltros', getAspiranteAllFiltros);
router.put('/update', updateExamenAspirante);
router.put('/updateAspirante', updateAspirante);
router.get('/:dni', getAspirante);

export default router;