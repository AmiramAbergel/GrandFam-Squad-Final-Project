import { WeeklyScoreTable } from '../models/weeklyScoreTable.model.js';
import { deleteOne, getAll, updateOne } from './factoryHandler.js';

export const getAllScoreTable = getAll(WeeklyScoreTable);

export const updateScoreTable = updateOne(WeeklyScoreTable);
export const deleteScoreTable = deleteOne(WeeklyScoreTable);
