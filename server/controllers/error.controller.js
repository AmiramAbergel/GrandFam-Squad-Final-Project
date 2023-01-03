import AppError from '../utils/appError.js';

const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
    const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((element) => element.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return AppError(message, 400);
};

const handleJWTError = () =>
    AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () =>
    AppError('Your token has expired! Please log in again.', 401);

const sendError = (err, req, res) => {
    if (err.isOperational) {
        // Operational, send message to client
        return res.status(err.statusCode).json({
            title: 'Something went wrong!',
            msg: err.message,
            status: err.status,
            error: err,
            stack: err.stack,
        });
    }
    // Log error
    console.error('ERROR 💥', err);
    //  Send generic message
    return res.status(err.statusCode).json({
        title: 'Something went wrong!',
        status: 'error',
        msg: 'Please try again later.',
    });
};

export default (err, req, res, next) => {
    // console.log(err.stack);
    err.statusCode = err.statusCode || 500; // 500 is the default status code for server errors (internal server error)
    err.status = err.status || 'error'; // error, success, fail e
    let error = { ...err }; // Copy the error object to a new object so we can modify it without affecting the original error object (err)
    error.message = err.message; // Copy the error message to the new error object
    if (error.name === 'CastError') {
        // If the error is a CastError (invalid id) (e.g. invalid id in the url)
        error = handleCastErrorDB(error);
    }
    if (error.code === 11000) {
        // If the error is a duplicate field error (e.g. duplicate email)
        error = handleDuplicateFieldsDB(error);
    }
    if (error.name === 'ValidationError') {
        // If the error is a validation error (invalid data) (e.g. invalid email, invalid password, etc.)
        error = handleValidationErrorDB(error);
    }
    if (error.name === 'JsonWebTokenError') {
        // If the error is a JsonWebTokenError (invalid token) (e.g. invalid token)
        error = handleJWTError();
    }
    if (error.name === 'TokenExpiredError') {
        // If the error is a TokenExpiredError (expired token) (e.g. expired token)
        error = handleJWTExpiredError();
    }
    sendError(error, req, res); // Send the error to the client
};
