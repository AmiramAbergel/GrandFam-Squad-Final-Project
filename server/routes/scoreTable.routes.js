import { Router } from 'express';
import {
    deleteScoreTable,
    getAllScoreTable,
    getScoreTable,
    updateScoreTable,
} from '../controllers/weeklySoreTable.controllers.js';
import { authProtect } from '../middleware/auth.middleware.js';

export const scoreTableRoute = Router();

scoreTableRoute.route('/').get(getAllScoreTable);

scoreTableRoute
    .route('/:id')
    .get(getScoreTable)
    .patch(updateScoreTable)
    .delete(authProtect, deleteScoreTable);
