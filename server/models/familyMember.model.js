import mongoose from 'mongoose';
import validator from 'validator';
const { Schema } = mongoose;

const familyMemberSchema = new Schema({});

export const FamilyMember = mongoose.model('FamilyMember', familyMemberSchema);
