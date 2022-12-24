import { Router } from 'express';
import { signup } from '../controllers/auth.controller.js';

export const userRoute = Router();

userRoute.post('/signup', signup);
// userRoute.post('/login', authController.login);
// userRoute.post('/logout', authController.logout);
