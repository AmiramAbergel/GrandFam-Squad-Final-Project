import { Router } from 'express';
import {
    createGrandparents,
    deleteGrandparents,
    getAllGrandparents,
    getGrandparents,
} from '../controllers/grandparents.controllers.js';
import {
    createGrandParentsTask,
    getAllGrandParentsTasks,
} from '../controllers/grandparentsTasks.controllers.js';
import {
    createUser,
    deleteUser,
    getAllUsers,
    getUser,
    updateUser,
} from '../controllers/user.controllers.js';

// admin only
export const adminRoute = Router();
adminRoute.route('/').get(getAllUsers).post(createUser); // '/api/v1/users' is the base url for all user routes

adminRoute
    .route('/grandparents')
    .get(getAllGrandparents)
    .post(createGrandparents); // '/api/v1/users' is the base url for all user routes
adminRoute
    .route('/grandparents/:id')
    .get(getGrandparents)
    .delete(deleteGrandparents);

adminRoute
    .route('/grandparents/tasks')
    .get(getAllGrandParentsTasks)
    .post(createGrandParentsTask);

adminRoute.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
// grandparent handle routes for admin only
