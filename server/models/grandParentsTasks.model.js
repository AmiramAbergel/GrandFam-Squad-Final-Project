import mongoose from 'mongoose';
import validator from 'validator';
const { Schema } = mongoose;

const grandParentsTasksSchema = new Schema({
    grandParentAssigned: {
        type: Schema.Types.ObjectId,
        ref: 'GrandParent',
        required: true,
    },
    taskType: { type: String, required: true }, // appointment, event, task,
    taskName: { type: String, required: true },
    taskTime: { type: Date, required: true }, // date and time
    taskColor: { type: String, required: true }, // color for the task
    taskLocation: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, required: true }, // completed, not completed
    familyMemberAssigned: {
        type: Schema.ObjectId,
        ref: 'FamilyMember',
        required: true,
    },
});

grandParentsTasksSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'familyMemberAssigned',
        select: 'nickname',
    });
    next();
});

export const GrandParentsTasks = mongoose.model(
    'GrandParentsTasks',
    grandParentsTasksSchema
);
