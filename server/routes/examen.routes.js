import express from 'express';
import { createExamen, updateExamen, getEstado} from '../controller/examen.controller.js';

const router = express.Router();
router.get('/estado', getEstado)
router.post('/examen', createExamen);
router.put('/update/:id_examen', updateExamen);

export default router;