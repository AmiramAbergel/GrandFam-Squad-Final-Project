import jwt from 'jsonwebtoken';
import { User } from '../models/userAuth.model.js';
import dotenv from 'dotenv';
dotenv.config(); // Load ENV Variables
import AppError from '../utils/appError.js';

export const authProtect = async (req, res, next) => {
    // This is a middleware function That will run before all the routes that are protected by this middleware
    try {
        // 1) Getting token and check of it's there
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }

        if (!token) {
            return next(
                AppError(
                    'You are not logged in! Please log in to get access.',
                    401
                )
            );
        }

        // 2) Verification token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // 3) Check if user still exists
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            // If the user is deleted after the token is issued, the user will not be found in the database
            return next(
                AppError(
                    'The user belonging to this token does no longer exist.',
                    401
                )
            );
        }
        // 4) Check if user changed password after the token was issued
        if (currentUser.changedPasswordAfter(decoded.iat)) {
            // iat is the issued at time
            return next(
                AppError(
                    'User recently changed password! Please log in again.',
                    401
                )
            );
        }
        // GRANT ACCESS TO PROTECTED ROUTE
        req.user = currentUser; // store the user in the request object so that it can be accessed in the controller function
        next(); // This is the next middleware function in the route handler (in this case, the controller function)
    } catch (err) {
        next(err, req, res);
    }
};
