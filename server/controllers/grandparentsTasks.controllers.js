import { GrandParentsTasks } from '../models/grandParentsTasks.model.js';
import { createOne, deleteOne, getAll, updateOne } from './factoryHandler.js';

export const getAllGrandParentsTasks = getAll(GrandParentsTasks);
export const createGrandParentsTask = createOne(GrandParentsTasks);
export const updateGrandParentsTask = updateOne(GrandParentsTasks);
export const deleteGrandParentsTask = deleteOne(GrandParentsTasks);
