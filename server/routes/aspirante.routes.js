import express from 'express';
import { createAspirante, updateAspirante, getAspirante, getAspiranteAll, getAprobados} from '../controller/aspirante.controller.js';
import verifyToken from '../middleware/jwt.js';

const router = express.Router();
router.post('/aspirante', createAspirante);
router.post('/aprobados', getAprobados)
router.post('/aspirantes', getAspiranteAll);
router.get('/:dni?', getAspirante);
router.put('/update/:dni', verifyToken, updateAspirante);

export default router;

