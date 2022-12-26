import mongoose from 'mongoose';
import validator from 'validator';
const { Schema } = mongoose;

const grandParentsTasksSchema = new Schema({
    task: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, required: true },

    status: { type: Boolean, required: true },
    familyMember: {
        type: Schema.Types.ObjectId,
        ref: 'FamilyMember',
        required: true,
    },
});

export const grandParentsTasks = mongoose.model(
    'GrandParentsTasks',
    grandParentsTasksSchema
);
