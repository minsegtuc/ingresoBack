import express from 'express';
import AspiranteRutas from './aspirante.routes.js';
import ExamenRutas from './examen.routes.js';
import UsuarioRutas from './usuario.routes.js';
import PreguntaRutas from './pregunta.routes.js'
import ExamenAspiranteRutas from './examenAspirante.routes.js';
import verifyToken from '../middleware/jwt.js';
import VerifyToken from '../controller/verifytoken.controller.js';

const router = express.Router();
router.use('/aspirantes', verifyToken, AspiranteRutas);
router.use('/examenes', verifyToken, ExamenRutas);
router.use('/examenAspirantes', verifyToken, ExamenAspiranteRutas);
router.use('/usuarios', UsuarioRutas);
router.use('/preguntas', verifyToken, PreguntaRutas)
router.get('/verifyToken', verifyToken, VerifyToken);

export default router;