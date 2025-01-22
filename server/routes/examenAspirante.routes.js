import express from 'express';
import { createExamenAspirante, updateExamenAspirante, getAprobados, getAspiranteAll, getAspirante} from '../controller/examenAspirante.controller.js';

const router = express.Router();
router.post('/aprobados', getAprobados)
router.post('/examenAspirante', createExamenAspirante);
router.post('/aspirantes', getAspiranteAll);
router.put('/update', updateExamenAspirante);
router.get('/:dni', getAspirante);

export default router;