import { Router } from 'express';
import {
    forgotPassword,
    login,
    logout,
    resetPassword,
    signup,
    updatePassword,
} from '../controllers/auth.controller.js';
import { deleteMe, updateMe } from '../controllers/user.controllers.js';
import { authProtect } from '../middleware/auth.middleware.js';

export const userRoute = Router();

userRoute.post('/signup', signup);
userRoute.post('/login', login);
userRoute.post('/forgotPassword', forgotPassword);
userRoute.patch('/resetPassword/:token', resetPassword);
userRoute.patch('/updateMyPassword', authProtect, updatePassword); // This route is used to update the user's password
userRoute.patch('/updateMe', authProtect, updateMe); // This route is used to update the user's name and email
userRoute.delete('/deleteMe', authProtect, deleteMe); // This route is used to delete the user

userRoute.post('/logout', logout);
