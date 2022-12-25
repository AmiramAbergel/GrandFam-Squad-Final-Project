import AppError from '../utils/appError.js';

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

export const getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
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
            req.user.id,
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

// This function is used to delete the currently logged in user
export const deleteMe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, { active: false });

        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        next(err, req, res);
    }
};
