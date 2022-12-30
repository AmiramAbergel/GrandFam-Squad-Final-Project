import mongoose from 'mongoose';
import validator from 'validator';
const { Schema } = mongoose;

const weeklyScoreTableSchema = new Schema({
    familyID: { type: String, required: true },
    familyName: { type: String, required: true },
    week: { type: String, required: true },
    rank: [
        {
            familyMember: {
                type: Schema.ObjectId,
                ref: 'User',
                required: true,
            },
            totalScore: { type: Number },
        },
    ],
});
// Populate the familyMember field in the rank array with the name of the family member from the familyMember collection
weeklyScoreTableSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'rank.familyMember',
        select: 'name',
    });
    next();
});

export const WeeklyScoreTable = mongoose.model(
    'WeeklyScoreTable',
    weeklyScoreTableSchema
);
