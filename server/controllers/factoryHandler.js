import { User } from '../models/userAuth.model.js';
import AppError from '../utils/appError.js';

export const deleteOne = (Model) => async (req, res, next) => {
    try {
        const doc = await Model.findByIdAndDelete(req.params.id);
        if (!doc) {
            return next(AppError('No document found with that ID', 404));
        }
        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        next(err, req, res);
    }
};

export const updateOne = (Model) => async (req, res, next) => {
    try {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!doc) {
            return next(AppError('No document found with that ID', 404));
        }
        res.status(200).json({
            status: 'success',
            data: {
                data: doc,
            },
        });
    } catch (err) {
        next(err, req, res);
    }
};

export const createOne = (Model) => async (req, res, next) => {
    try {
        const doc = await Model.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                data: doc,
            },
        });
    } catch (err) {
        next(err, req, res);
    }
};

export const getOne = (Model, popOptions) => async (req, res, next) => {
    try {
        let query = Model.findById(req.params.id);
        if (popOptions) query = query.populate(popOptions);
        const doc = await query;

        const userInGroup = doc.rank;
        let filter = {};
        if (req.params) {
            filter = {
                userInGroup,
            };
        }
        //getting all users in the group
        // Apply filters
        let secQuery = User.find(filter);

        // Execute query
        const secDoc = await secQuery;

        if (!doc) {
            return next(AppError('No document found with that ID', 404));
        }
        res.status(200).json({
            status: 'success',
            data: {
                data: doc,
                members: secDoc,
            },
        });
    } catch (err) {
        next(err, req, res);
    }
};

export const getAll = (Model) => async (req, res, next) => {
    try {
        // To allow for nested GET reviews on tour (hack)
        let filter = {};
        if (req.params.taskId) {
            filter = { tasks: req.params.taskId };
        }
        if (req.params.uid) {
            filter = { sharedWith: { $elemMatch: { $eq: req.params.uid } } };
        }

        // Apply filters
        let query = Model.find(filter);

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
        } else if (req.query.groups) {
            // Select fields
            query = query.select('familyID familyName').exec();
        } else {
            query = query.select('-__v');
        }

        // Execute query
        const doc = await query;

        // Send response
        res.status(200).json({
            status: 'success',
            results: doc.length,
            data: {
                data: doc,
            },
        });
    } catch (err) {
        next(err, req, res);
    }
};
