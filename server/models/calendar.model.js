import mongoose from 'mongoose';
import validator from 'validator';
const { Schema } = mongoose;

const calendarSchema = new Schema({
    CategoryColor: { type: String, required: true },
});

export const Calendar = mongoose.model('Calendar', calendarSchema);
