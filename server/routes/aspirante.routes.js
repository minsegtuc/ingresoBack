import express from 'express';
import { createAspirante, updateAspirante, getAspirante} from '../controller/aspirante.controller.js';
import verifyToken from '../middleware/jwt.js';

const router = express.Router();
router.post('/aspirante', createAspirante);
router.put('/update/:dni', verifyToken, updateAspirante);

//SE PUEDE USAR EN EL NUEVO RUTAS DEL NUEVO MODELO
router.get('/:dni?', getAspirante);

export default router;

