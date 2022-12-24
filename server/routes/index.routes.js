import { Router } from 'express';
import { userRoute } from './user.routes.js';
const indexRoute = Router(); // Create a Router Object

export default indexRoute;

indexRoute.use('/users', userRoute); // '/api/v1/users' is the base url for all user routes
