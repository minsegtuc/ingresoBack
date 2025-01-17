import express from 'express';
import { createUsuario, updateUsuario, login, logout} from '../controller/usuario.controller.js';
import verifyToken from '../middleware/jwt.js';

const router = express.Router();
router.post('/usuario', verifyToken, createUsuario);
router.put('/update/:id_usuario', verifyToken, updateUsuario);
router.post('/login', login);
router.post('/logout', verifyToken, logout)

export default router;
