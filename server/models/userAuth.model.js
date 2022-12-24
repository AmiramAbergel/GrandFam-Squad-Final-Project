import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
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
        validate: {
            // This only works on CREATE and SAVE!!!
            validator: function (element) {
                return element === this.password;
            },
            message: 'Passwords are not the same!',
        },
    },
    photo: { type: String, default: 'default.jpg' },
    id: { type: String },
});

// Only run this function if password was actually modified
userSchema.pre('save', async function (next) {
    const user = this; // this refers to the current document being processed

    if (!user.isModified('password')) {
        return next(); // If the password was not modified, then return next() and skip the rest of the function
    }

    // Hash the password with cost of 12
    user.password = await bcrypt.hash(user.password, 12);

    // Delete passwordConfirm field
    user.passwordConfirm = undefined;
    next();
});

// userSchema.pre('save', function (next) {
//     const user = this; // this refers to the current document being processed
//     if (!user.isModified('password') || user.isNew) {
//         return next();
//     }

//     user.passwordChangedAt = Date.now() - 1000;
//     next();
// });

export const User = mongoose.model('User', userSchema);
