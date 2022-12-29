import mongoose from 'mongoose';
import validator from 'validator';
const { Schema } = mongoose;

const grandParentsTasksSchema = new Schema({
    taskType: { type: String, required: true }, // appointment, event, task,
    taskName: { type: String, required: true },
    taskTime: { type: Date, required: true }, // date and time
    taskColor: { type: String, required: true }, // color for the task
    taskLocation: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, required: true }, // completed, not completed
    familyMemberAssigned: {
        type: Schema.Types.ObjectId,
        ref: 'FamilyMember',
        required: true,
    },
});

export const grandParentsTasks = mongoose.model(
    'GrandParentsTasks',
    grandParentsTasksSchema
);
