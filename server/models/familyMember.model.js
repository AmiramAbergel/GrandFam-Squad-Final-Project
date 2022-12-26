import mongoose from 'mongoose';
import validator from 'validator';
const { Schema } = mongoose;

const familyMemberSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    img: { type: String, required: true },
    mail: { type: String, required: true },
    maternalRank: {
        visit: { type: Number, required: true },
        call: { type: Number, required: true },
        total: { type: Number, required: true },
    },
    paternalRank: {
        visit: { type: Number, required: true },
        call: { type: Number, required: true },
        total: { type: Number, required: true },
    },
    maternalGrandparent: {
        type: Schema.Types.ObjectId,
        ref: 'Grandparent',
        required: true,
    },
    paternalGrandparent: {
        type: Schema.Types.ObjectId,
        ref: 'Grandparent',
        required: true,
    },
});

export const FamilyMember = mongoose.model('FamilyMember', familyMemberSchema);
