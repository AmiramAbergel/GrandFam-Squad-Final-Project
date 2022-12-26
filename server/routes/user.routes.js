import { Router } from 'express';
import { restrictTo, updatePassword } from '../controllers/auth.controller.js';
import { deleteMe, updateMe } from '../controllers/user.controllers.js';
import { authProtect } from '../middleware/auth.middleware.js';

export const userRoute = Router();

// Protect all routes after this middleware
userRoute.use(authProtect);

userRoute.patch('/updateMyPassword', updatePassword); // This route is used to update the user's password
userRoute.patch('/updateMe', updateMe); // This route is used to update the user's name and email
userRoute.delete('/deleteMe', deleteMe); // This route is used to delete the user

userRoute.use(restrictTo('admin')); // Restrict all routes after this middleware to only admin users

// userRoute.route('/').get(getAllUsers).post(createUser); // '/api/v1/users' is the base url for all user routes

// userRoute.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
