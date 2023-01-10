import { Router } from 'express';
import {
    createGrandparents,
    deleteGrandparents,
    getAllGrandparents,
    getGrandparents,
    updateGrandparents,
} from '../controllers/grandparents.controllers.js';
import {
    createGrandParentsTask,
    getAllGrandParentsTasks,
} from '../controllers/grandparentsTasks.controllers.js';

import {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser,
} from '../controllers/user.controllers.js';
import {
    deleteScoreTable,
    getAllScoreTable,
} from '../controllers/weeklySoreTable.controllers.js';

// admin only
export const adminRoute = Router();
adminRoute.route('/admin').get(getAllUsers); // '/api/v1/users' is the base url for all user routes

adminRoute
    .route('/admin/grandparents')
    .get(getAllGrandparents)
    .post(createGrandparents); // '/api/v1/users' is the base url for all user routes

adminRoute
    .route('/admin/manage/grandparents/:id')
    .get(getGrandparents)
    .patch(updateGrandparents)
    .delete(deleteGrandparents);

adminRoute.route('/admin/grandparents/score-table').get(getAllScoreTable); //Score table created when grandparents created
adminRoute
    .route('/admin/grandparents/score-table/:id')
    .delete(deleteScoreTable); //Score table created when grandparents created

adminRoute
    .route('/admin/grandparents/tasks')
    .get(getAllGrandParentsTasks)
    .post(createGrandParentsTask);

adminRoute
    .route('/admin/manage/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);
// grandparent handle routes for admin only
