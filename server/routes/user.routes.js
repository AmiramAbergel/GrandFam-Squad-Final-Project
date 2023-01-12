import { Router } from 'express';
import { restrictTo, updatePassword } from '../controllers/auth.controller.js';
import { getMeAsFamilyMember } from '../controllers/familyMember.controller.js';

import {
    createGrandparents,
    getAllGrandparents,
} from '../controllers/grandparents.controllers.js';
import { getAllGrandParentsTasks } from '../controllers/grandparentsTasks.controllers.js';
import {
    deleteMe,
    getMe,
    getUser,
    updateMe,
} from '../controllers/user.controllers.js';
import { getScoreTable } from '../controllers/weeklySoreTable.controllers.js';
import { authProtect } from '../middleware/auth.middleware.js';
import { adminRoute } from './grandparentsAdmin.routes.js';

export const userRoute = Router();

// Protect all routes after this middleware
userRoute.use(authProtect);
userRoute.patch('/updateMyPassword', updatePassword); // This route is used to update the user's password
userRoute.get('/me', getMe, getUser); // This route is used to update the user's password
userRoute.patch('/updateMe', updateMe); // This route is used to update the user's name and email
userRoute.delete('/deleteMe', deleteMe); // This route is used to delete the user

userRoute.route('/familyMember/:id').get(getMeAsFamilyMember);

userRoute.route('/grandparents/new').post(createGrandparents); // This route is used to create a new grandparents group

userRoute.route('/me/grandparents').get(getMe, getAllGrandparents);

userRoute.route('/me/grandparents/:gid/tasks').get(getAllGrandParentsTasks); // This route is used to get all tasks for a grandparents group given the grandparents group id

userRoute.route('/me/grandparents/:id/score-table').get(getScoreTable); // This route is used to get score-table for a grandparents group given the grandparents familyScore id (id of score table)

userRoute.use(restrictTo('admin')); // Restrict all routes after this middleware to only admin users
// grandparent and admin handle routes for admin only
userRoute.use(adminRoute);
