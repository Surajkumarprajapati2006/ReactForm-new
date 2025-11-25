import express from 'express';
import { Register, Login } from '../controllers/authcontroller.js';

const authRoutes = express.Router();

authRoutes.post('/register', Register);
authRoutes.post('/login', Login);   

export default authRoutes;