import mongoose from 'mongoose';
import validator from 'validator';
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
        type: Schema.ObjectId,
        ref: 'GrandParents',
    },
    paternalGrandparents: {
        type: Schema.ObjectId,
        ref: 'GrandParents',
    },
});

familyMemberSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'paternalGrandparents',
        select: 'grandma',
    });

    //this.sharedWith.push(this.user.id);
    next();
});

familyMemberSchema.pre('validate', function (next) {
    if (this.maternalGrandparents || this.paternalGrandparents) {
        next();
    } else {
        next(
            new Error(
                'Either maternalGrandparents or paternalGrandparents are required'
            )
        );
    }
});

// .path('paternalGrandparents')
// .validate(function (paternalGrandparents) {
//     return this.maternalGrandparents || paternalGrandparents;
// }, 'Either maternalGrandparents or paternalGrandparents are required');

export const FamilyMember = mongoose.model('FamilyMember', familyMemberSchema);
