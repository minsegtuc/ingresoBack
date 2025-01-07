import Usuario from "../model/usuario.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { registrarLog } from '../helpers/logHelpers.js';

dotenv.config();

const createUsuario = async (req, res) => {
    //console.log("INGRESO CREAR USUARIO: ", req.body);
    try {
        await Usuario.create({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            user_name: req.body.user_name,
            password: req.body.password,
            rol: req.body.rol
        });
        res.status(201).json("usuario creado");
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const updateUsuario = async (req, res) => {
    //console.log("ACTUALIZAR USUARIO: ", req.body);
    try {
        await Usuario.update({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            user_name: req.body.user_name,
            password: req.body.password,
            rol: req.body.rol
        }, {
            where: {
                id_usuario: req.params.id_usuario
            }
        });
        res.status(200).json("usuario actualizado");
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const login = async (req, res) => {
    console.log("Login: ", req.body);
    try {
        const usuario = await Usuario.findOne({
            where: {
                user_name: req.body.user_name,
            }
        });
        if (usuario) {
            const match = bcrypt.compareSync(req.body.password, usuario.password);
            if(match){
                const token = jwt.sign({
                    id_usuario: usuario.id_usuario,
                    user_name: usuario.user_name,
                    rol: usuario.rol
                }, process.env.JWT_SECRET, {
                    expiresIn: '5h'
                });

                res.cookie('auth_token', token, {
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'Strict',
                    maxAge: 18000000
                });

                const log = {
                    accion: 'Login',
                    descripcion: 'Usuario logueado',
                    dniId: usuario.id_usuario
                }

                await registrarLog(log.accion, log.descripcion, log.dniId);

                res.status(200).json({
                    message: 'Usuario logueado',
                    token: token
                });
            }else{
                res.status(400).json({
                    message: 'Usuario o contraseña incorrectos'
                });
            }            
        } else {
            res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const logout = (req, res) => {
    try {
        res.clearCookie('auth_token');
        
        res.status(200).json({
            message: 'Usuario deslogueado'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export { createUsuario, updateUsuario, login, logout };