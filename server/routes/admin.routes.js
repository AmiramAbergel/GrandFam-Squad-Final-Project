import { Router } from 'express';

export const adminRoute = Router();
adminRoute.route('/').get(getAllUsers).post(createUser); // '/api/v1/users' is the base url for all user routes

adminRoute.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
// grandparent handle routes for admin only

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
    .get(getAllTasks)
    .post(createGrandparentsTask);
