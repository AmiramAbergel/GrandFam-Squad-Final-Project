import mongoose from 'mongoose';
import validator from 'validator';
const { Schema } = mongoose;

const grandParentsSchema = new Schema({
    side: { type: String, required: true },
    grandma: {
        name: { type: String, required: true },
        age: { type: Number, required: true },
    },
    spouse: {
        name: { type: String, required: true },
        age: { type: Number, required: true },
        relationship: { type: String, required: true },
    },
    familyName: { type: String, required: true },
    sharedWith: [{ type: String, required: true }],
    address: { type: String, required: true },
    phone: { type: String, required: true },
    img: { type: String, required: true, default: '' },
    location: { type: { type: String }, coordinates: [Number] },
});

export const GrandParents = mongoose.model('GrandParents', grandParentsSchema);
