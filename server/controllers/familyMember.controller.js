import { FamilyMember } from '../models/familyMember.model.js';
import { deleteOne, getOne, updateOne } from './factoryHandler.js';

export const getMeAsFamilyMember = getOne(FamilyMember);
export const updateGrandParentsTask = updateOne(FamilyMember);
export const deleteGrandParentsTask = deleteOne(FamilyMember);
