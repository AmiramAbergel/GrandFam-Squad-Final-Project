import { GrandParentsTasks } from '../models/grandParentsTasks.model.js';
import { createOne, deleteOne, getAll } from './factoryHandler.js';
import { updateMe } from './user.controllers.js';

export const getAllGrandParentsTasks = getAll(GrandParentsTasks);
export const createGrandParentsTask = createOne(GrandParentsTasks);
export const updateGrandParentsTask = updateMe(GrandParentsTasks);
export const deleteGrandParentsTask = deleteOne(GrandParentsTasks);
