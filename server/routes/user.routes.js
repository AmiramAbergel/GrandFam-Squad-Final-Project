import { Router } from 'express';
import { restrictTo, updatePassword } from '../controllers/auth.controller.js';
import { getMeAsFamilyMember } from '../controllers/familyMember.controller.js';

import {
    getGrandparents,
    createGrandparents,
    getAllGrandparentsGroups,
    getAllGrandparents,
} from '../controllers/grandparents.controllers.js';
import {
    createGrandParentsTask,
    getAllGrandParentsTasks,
} from '../controllers/grandparentsTasks.controllers.js';
import {
    deleteMe,
    getMe,
    getUser,
    updateMe,
} from '../controllers/user.controllers.js';
import { authProtect } from '../middleware/auth.middleware.js';
import { adminRoute } from './grandparentsAdmin.routes.js';

export const userRoute = Router();

// Protect all routes after this middleware
userRoute.use(authProtect);

userRoute.patch('/updateMyPassword', updatePassword); // This route is used to update the user's password
userRoute.get('/me', getMe, getUser); // This route is used to update the user's password
userRoute.patch('/updateMe', updateMe); // This route is used to update the user's name and email
userRoute.delete('/deleteMe', deleteMe); // This route is used to delete the user
userRoute.route('/grandparents').get(getAllGrandparentsGroups);
userRoute.route('/grandparents/new').post(createGrandparents);
userRoute.route('/grandparents/tasks').get(getAllGrandParentsTasks);
userRoute.route('/familyMember/:id').get(getMeAsFamilyMember);
userRoute.route('/:uid/grandparents').get(getAllGrandparents);

userRoute.use(restrictTo('admin')); // Restrict all routes after this middleware to only admin users
// grandparent and admin handle routes for admin only
userRoute.use(adminRoute);
