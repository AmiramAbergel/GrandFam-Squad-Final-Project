import { Router } from 'express';
import {
    forgotPassword,
    login,
    logout,
    resetPassword,
    signup,
} from '../controllers/auth.controller.js';
export const authRoute = Router();

authRoute.post('/signup', signup);
authRoute.post('/login', login);
authRoute.post('/logout', logout);
authRoute.post('/forgotPassword', forgotPassword);
authRoute.patch('/resetPassword/:token', resetPassword);
