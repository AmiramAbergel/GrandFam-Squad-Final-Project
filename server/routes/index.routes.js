import { Router } from 'express';
import { subscribe } from '../controllers/user.controllers.js';
import { authRoute } from './auth.routes.js';
import { scoreTableRoute } from './scoreTable.routes.js';
import { userRoute } from './user.routes.js';
const indexRoute = Router(); // Create a Router Object

export default indexRoute;
indexRoute.post('/subscribe', subscribe); // This route is used to subscribe the user to push notification.
indexRoute.use('/score', scoreTableRoute); // '/api/v1/auth' is the base url for all auth routes
indexRoute.use(authRoute); // '/api/v1/
indexRoute.use('/users', userRoute); // '/api/v1/users' is the base url for all user routes
