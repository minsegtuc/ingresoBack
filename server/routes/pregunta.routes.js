import express from 'express'
import { createpregunta } from "../controller/pregunta.controller.js";

const router = express.Router();
router.post('/pregunta', createpregunta)

export default router;

