import webpush from 'web-push';
import { GrandParents } from '../models/grandParents.model.js';
import { Subscription } from '../models/notificationSubscription.model.js';

import { User } from '../models/userAuth.model.js';
import AppError from '../utils/appError.js';
import {
    createOne,
    deleteOne,
    getAll,
    getOne,
    updateOne,
} from './factoryHandler.js';

// filterObj is used to filter out unwanted fields names that are not allowed to be updated
const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((element) => {
        if (allowedFields.includes(element)) {
            newObj[element] = obj[element];
        }
    });
    return newObj;
};

export const updateMe = async (req, res, next) => {
    // This function is used to update the currently logged in user
    try {
        // 1) Create error if user POSTs password data
        if (req.body.password || req.body.passwordConfirm) {
            return next(
                AppError(
                    'This route is not for password updates. Please use /updateMyPassword.',
                    400
                )
            );
        }

        // 2) Filtered out unwanted fields names that are not allowed to be updated
        const filteredBody = filterObj(req.body, 'name', 'email');
        if (req.file) filteredBody.photo = req.file.filename;

        // 3) Update user document
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            filteredBody,
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            status: 'success',
            data: {
                user: updatedUser,
            },
        });
    } catch (err) {
        next(err, req, res);
    }
};

export const getMe = (req, res, next) => {
    req.params.id = req.user._id;
    next();
};

// This function is used to delete the currently logged in user
export const deleteMe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user._id, { active: false });
        console.log('User deleted successfully');
        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        next(err, req, res);
    }
};

export const createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not defined! Please use /signup instead',
    });
};

export const subscribe = async (req, res, next) => {
    //web push keys for notifications (vapid keys)
    const publicVapidKey = process.env.WEB_PUSH_PUBLIC; // Get the Public Key from the .env file
    const privateVapidKey = process.env.WEB_PUSH_PRIVATE; // Get the Private Key from the .env file
    try {
        const subscription = await Subscription.create(req.body);
        const options = {
            vapidDetails: {
                subject: 'mailto:tacos9010@gmail.com',
                publicKey: publicVapidKey,
                privateKey: privateVapidKey,
            },
        };
        const payload = JSON.stringify({
            title: 'Hello from server',
            description: 'this message is coming from the server',
            image: 'https://cdn2.vectorstock.com/i/thumb-large/94/66/emoji-smile-icon-symbol-smiley-face-vector-26119466.jpg',
        });
        const resp2 = await webpush.sendNotification(
            subscription,
            payload,
            options
        ); // Send the notification to the user
        console.log('resp2', resp2);
        res.status(201).json({
            status: 'success',
            data: {
                subscription,
            },
        });
    } catch (err) {
        next(err, req, res);
    }
};

export const getUser = getOne(User);
export const getAllUsers = getAll(User);

// do not update passwords with this!
export const updateUser = updateOne(User);
export const deleteUser = deleteOne(User);

// admin only
export const createGrandparents = createOne(GrandParents);
export const getAllGrandparents = getAll(GrandParents);
export const getGrandparents = getOne(GrandParents);
export const deleteGrandparents = deleteOne(GrandParents);
