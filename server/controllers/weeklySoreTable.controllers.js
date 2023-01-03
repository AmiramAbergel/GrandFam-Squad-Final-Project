import { WeeklyScoreTable } from '../models/weeklyScoreTable.model.js';
import { deleteOne, getAll, getOne, updateOne } from './factoryHandler.js';

export const getAllScoreTable = getAll(WeeklyScoreTable);
export const getScoreTable = getOne(WeeklyScoreTable);
export const updateScoreTable = updateOne(WeeklyScoreTable);
export const deleteScoreTable = deleteOne(WeeklyScoreTable);
