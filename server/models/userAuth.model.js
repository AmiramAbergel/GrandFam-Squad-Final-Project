import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import crypto from 'crypto'; // this is a built-in node module that comes with node.js and is used to generate random strings
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
        select: false,
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
    role: {
        // this field will be used to check if the user is an admin or a regular user
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    id: { type: String },
    passwordChangedAt: Date, // this field will be used to check if the user changed their password after the token was issued
    passwordResetToken: String, // this field will be used to store the reset token
    passwordResetExpires: Date, // this field will be used to store the expiration date of the reset token
    active: {
        // this field will be used to check if the user is active or not
        type: Boolean,
        default: true,
        select: false,
    },
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

userSchema.methods.correctPassword = async function (
    // This is an instance method, which means it is available on all documents of a certain collection
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    const user = this; // this refers to the current document being processed
    if (user.passwordChangedAt) {
        // if the password was changed
        const changedTimestamp = parseInt(
            // convert the date to seconds
            user.passwordChangedAt.getTime() / 1000, // convert the date to milliseconds and then divide by 1000 to get the seconds
            10 // base 10
        );

        return JWTTimestamp < changedTimestamp;
    }

    // False means NOT changed
    return false;
};

userSchema.pre('save', function (next) {
    const user = this; // this refers to the current document being processed
    if (!user.isModified('password') || user.isNew) {
        // if the password was not modified or the user is new (not in the database yet)
        return next();
    }

    user.passwordChangedAt = Date.now() - 1000; // subtract 1 second from the current time to make sure the token is issued before the password was changed
    next();
});

// This middleware will be used to hide inactive users from the database, marking them as inactive will not delete them from the database but will hide them to the user
userSchema.pre(/^find/, function (next) {
    // this points to the current query
    this.find({ active: { $ne: false } }); // $ne means not equal to false (i.e. active) and will be used to hide inactive users
    next();
});

// this method provides a password reset token in case the user forgets their password
userSchema.methods.createPasswordResetToken = function () {
    const user = this; // this refers to the current document being processed
    const resetToken = crypto.randomBytes(32).toString('hex'); // generate a random string of 32 bytes and convert it to a string

    user.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // console.log({ resetToken }, user.passwordResetToken);

    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

export const User = mongoose.model('User', userSchema);
