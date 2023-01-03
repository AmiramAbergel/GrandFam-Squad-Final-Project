import { User } from '../models/userAuth.model.js';
import dotenv from 'dotenv';
dotenv.config(); // Load ENV Variables
import jwt from 'jsonwebtoken';
import AppError from '../utils/appError.js';
import crypto from 'crypto';
import url from 'url'; // This is used to parse the url in the forgotPassword function
import Email from '../utils/emailHandler.js';
import { FamilyMember } from '../models/familyMember.model.js';
import { GrandParents } from '../models/grandParents.model.js';
import { WeeklyScoreTable } from '../models/weeklyScoreTable.model.js';

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);
    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user,
            token,
        },
    });
};

export const signup = async (req, res, next) => {
    let myGrandparents;
    let scoreTable;
    let familyMemberInfo;
    try {
        if (req.body.familyMember) {
            familyMemberInfo = await FamilyMember.create({
                age: req.body.familyMember.age,
                address: req.body.familyMember.address,
                phone: req.body.familyMember.phone,
                maternalGrandparents: req.body.familyMember.maternalGrandparents
                    ? req.body.familyMember.maternalGrandparents
                    : undefined,
                paternalGrandparents: req.body.familyMember.paternalGrandparents
                    ? req.body.familyMember.paternalGrandparents
                    : undefined,
            });
            if (req.body.familyMember.maternalGrandparents) {
                myGrandparents = await GrandParents.findByIdAndUpdate(
                    req.body.familyMember.maternalGrandparents,
                    {
                        $push: { sharedWith: familyMemberInfo._id },
                    },
                    { new: true }
                );

                scoreTable = await WeeklyScoreTable.findByIdAndUpdate(
                    myGrandparents.familyScore,
                    { $push: { rank: familyMemberInfo._id } },
                    { new: true }
                );
            }
            if (req.body.familyMember.paternalGrandparents) {
                myGrandparents = await GrandParents.findByIdAndUpdate(
                    req.body.familyMember.paternalGrandparents,
                    { $push: { sharedWith: familyMemberInfo._id } },
                    { new: true }
                );

                scoreTable = await WeeklyScoreTable.findByIdAndUpdate(
                    myGrandparents.familyScore,
                    { $push: { rank: familyMemberInfo._id } },
                    { new: true }
                );
            }
        }

        const newUser = await User.create({
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
            ...(req.body.familyMember
                ? { familyMember: familyMemberInfo._id }
                : {}),
        });

        await Object.create(Email(newUser)).sendWelcome();
        createSendToken(newUser, 201, req, res);
    } catch (err) {
        if (familyMemberInfo) {
            await familyMemberInfo.deleteOne();
        }
        next(err, req, res);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // 1) Check if email and password exist
        if (!email || !password) {
            return next(AppError('Please provide email and password!', 400));
        }
        // 2) Check if user exists && password is correct
        const user = await User.findOne({ email })
            .select('+password')
            .populate({ path: 'familyMember', model: FamilyMember })
            .exec(); // select('+password') is used to select the password field in the body of the response (it is not selected by default) because it is set to select: false in the user model

        if (!user || !(await user.correctPassword(password, user.password))) {
            // if the user does not exist or the password is incorrect then return an error
            return next(AppError('Incorrect email or password', 401));
        }

        // 3) If everything ok, send token to client
        createSendToken(user, 200, req, res);
    } catch (err) {
        next(err, req, res);
    }
};

export const logout = async (req, res) => {
    try {
        res.status(200).json({ status: 'success' });
    } catch (err) {
        next(err, req, res);
    }
};
// This function is used to protect the routes that require authentication (i.e. the user must be logged in to access them)
export const restrictTo = (...roles) => {
    return (req, res, next) => {
        // roles ['admin']. role='user'
        if (!roles.includes(req.user.role)) {
            // if the user role is not in the roles array
            return next(
                // then return an error
                new AppError(
                    'You do not have permission to perform this action',
                    403
                )
            );
        }
        next(); // if the user role is in the roles array, then the next middleware function is called
    };
};

// This function is used to send a reset password link to the user's email
export const forgotPassword = async (req, res, next) => {
    // 1) Get user based on POSTed email
    const user = await User.findOne({ email: req.body.email }); // Find the user by email
    if (!user) {
        return next(AppError('There is no user with email address.', 404));
    }

    // 2) Generate the random reset token
    const resetToken = user.createPasswordResetToken(); // createPasswordResetToken() is a function defined in the user model

    await user.save({ validateBeforeSave: false }); // validateBeforeSave: false is used to disable all the validators defined in the user model (in this case, the validator that checks if the password and passwordConfirm fields are equal)
    try {
        // 3) Send it to user's email
        const { protocol, hostname } = req;

        const resetURL = new URL(
            `${protocol}://${hostname}/api/v1/resetPassword`
        );

        const searchParams = new URLSearchParams();
        searchParams.set('token', resetToken);
        resetURL.search = searchParams;
        const fixedURL = resetURL.toString();

        //await Email(user).sendPasswordReset(fixedURL);

        res.status(200).json({
            status: 'success',
            message: 'Token sent to email!',
        });
    } catch (err) {
        user.passwordResetToken = undefined; // if there is an error sending the email, then the passwordResetToken and passwordResetExpires fields are set to undefined
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return next(
            AppError('There was an error sending the email. Try again later!'),
            500
        );
    }
};

export const resetPassword = async (req, res, next) => {
    try {
        // 1) Get user based on the token
        const hashedToken = crypto
            .createHash('sha256')
            .update(req.params.token)
            .digest('hex');

        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() },
        });

        // 2) If token has not expired, and there is user, set the new password
        if (!user) {
            return next(AppError('Token is invalid or has expired', 400));
        }
        user.password = req.body.password;
        user.passwordConfirm = req.body.passwordConfirm;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        // 3) Update changedPasswordAt property for the user
        // 4) Log the user in, send JWT
        createSendToken(user, 200, req, res);
    } catch (err) {
        next(err, req, res);
    }
};
// This function is used to update the password of the user that is currently logged in (i.e. the user that is making the request)
export const updatePassword = async (req, res, next) => {
    try {
        // 1) Get user from collection
        const user = await User.findById(req.user.id).select('+password');

        // 2) Check if POSTed current password is correct
        if (
            !(await user.correctPassword(
                req.body.passwordCurrent,
                user.password
            ))
        ) {
            return next(AppError('Your current password is wrong.', 401));
        }

        // 3) If so, update password
        user.password = req.body.password;
        user.passwordConfirm = req.body.passwordConfirm;
        await user.save();
        // User.findByIdAndUpdate will NOT work as intended! (i.e. the validators will not be run)

        // 4) Log user in, send JWT
        createSendToken(user, 200, req, res);
    } catch (err) {
        next(err, req, res);
    }
};
