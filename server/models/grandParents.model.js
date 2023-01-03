import mongoose from 'mongoose';
import validator from 'validator';
const { Schema } = mongoose;
import { v4 as uuidv4 } from 'uuid';
export const grandParentsSchema = new Schema({
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
    familyID: { type: String, default: uuidv4() },
    sharedWith: [
        {
            type: Schema.ObjectId,
            ref: 'User',
        },
    ],
    familyScore: {
        type: Schema.ObjectId,
        ref: 'WeeklyScoreTable',
    },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    img: {
        type: String,
        required: true,
        default: 'https://xsgames.co/randomusers/avatar.php?g=pixel',
    },
    location: [
        {
            name: String,
            lat: Number, // [latitude,longitude]
            lng: Number,
        },
    ],
});

export const GrandParents = mongoose.model('GrandParents', grandParentsSchema);
