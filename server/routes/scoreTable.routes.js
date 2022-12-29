import { Router } from 'express';
import {
    createScoreTable,
    deleteScoreTable,
    getAllScoreTable,
    updateScoreTable,
} from '../controllers/weeklySoreTable.controllers.js';
import { authProtect } from '../middleware/auth.middleware.js';

export const scoreTableRoute = Router();

scoreTableRoute
    .route('/')
    .get(getAllScoreTable)
    .post(authProtect, createScoreTable); // '/api/v1/scoreTable' is the base url for all scoreTable routes

scoreTableRoute
    .route('/:id')
    .patch(updateScoreTable)
    .delete(authProtect, deleteScoreTable);
