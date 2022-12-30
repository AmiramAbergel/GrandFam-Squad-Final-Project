import mongoose from 'mongoose';
import validator from 'validator';
import { grandParentsSchema } from './grandParents.model.js';
const { Schema } = mongoose;

export const familyMemberSchema = new Schema({
    age: { type: Number, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    maternalRank: {
        visit: { type: Number, default: 0 },
        call: { type: Number, default: 0 },
        total: { type: Number, default: 0 },
    },
    paternalRank: {
        visit: { type: Number, default: 0 },
        call: { type: Number, default: 0 },
        total: { type: Number, default: 0 },
    },
    maternalGrandparents: {
        type: Schema.Types.ObjectId,
        ref: 'Grandparent',
        //required: true,
    },
    paternalGrandparents: {
        type: Schema.Types.ObjectId,
        ref: 'Grandparent',
        //  required: true,
    },
});

export const FamilyMember = mongoose.model('FamilyMember', familyMemberSchema);
