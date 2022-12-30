import { GrandParents } from '../models/grandParents.model.js';
import { createOne, deleteOne, getAll, getOne } from './factoryHandler.js';

// admin only
export const createGrandparents = createOne(GrandParents);
export const getAllGrandparents = getAll(GrandParents);
export const getGrandparents = getOne(GrandParents);
export const deleteGrandparents = deleteOne(GrandParents);
