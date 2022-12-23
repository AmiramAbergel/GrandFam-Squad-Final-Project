import mongoose from 'mongoose';
import validator from 'validator';
const { Schema } = mongoose;
const userSchema = new Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true, // convert email to lowercase
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minLength: 8,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
    },
    photo: { type: String, default: 'default.jpg' },
    id: { type: String },
});

export const User = mongoose.model('User', userSchema);
