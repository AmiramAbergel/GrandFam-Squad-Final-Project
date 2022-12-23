function AppError(message, statusCode) {
    const error = new Error(message); // Create a new Error Object

    error.statusCode = statusCode; // 404, 500, etc.
    error.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'; // 4xx is a client error, 5xx is a server error
    error.isOperational = true; // This is an operational error, not a programming error

    return error;
}

export default AppError;
