import mongoose from 'mongoose';
import validator from 'validator';
const { Schema } = mongoose;

const weeklyScoreTableSchema = new Schema({
    week: { type: String, required: true },
    familyMember: {
        type: Schema.Types.ObjectId,
        ref: 'FamilyMember',
        required: true,
    },
    totalVisits: { type: Number, required: true },
    totalCalls: { type: Number, required: true },
    totalScore: { type: Number, required: true },
});

export const WeeklyScoreTable = mongoose.model(
    'WeeklyScoreTable',
    weeklyScoreTableSchema
);
