import { Router } from 'express';
import { restrictTo, updatePassword } from '../controllers/auth.controller.js';
import {
    createGrandparents,
    createUser,
    deleteGrandparents,
    deleteMe,
    deleteUser,
    getAllGrandparents,
    getAllUsers,
    getGrandparents,
    getMe,
    getUser,
    subscribe,
    updateMe,
    updateUser,
} from '../controllers/user.controllers.js';
import { authProtect } from '../middleware/auth.middleware.js';
import { adminRoute } from './admin.routes.js';

export const userRoute = Router();

// Protect all routes after this middleware
userRoute.use(authProtect);

userRoute.patch('/updateMyPassword', updatePassword); // This route is used to update the user's password
userRoute.get('/me', getMe, getUser); // This route is used to update the user's password
userRoute.patch('/updateMe', updateMe); // This route is used to update the user's name and email
userRoute.delete('/deleteMe', deleteMe); // This route is used to delete the user

userRoute.use(restrictTo('admin')); // Restrict all routes after this middleware to only admin users
// grandparent and admin handle routes for admin only
userRoute.use(adminRoute);
