const sendError = (err, req, res) => {
    if (err.isOperational) {
        // Operational, send message to client
        return res.status(err.statusCode).render('error', {
            title: 'Something went wrong!',
            msg: err.message,
            status: err.status,
        });
    }
    // Log error
    console.error('ERROR 💥', err);
    //  Send generic message
    return res.status(err.statusCode).render('error', {
        title: 'Something went wrong!',
        status: 'error',
        msg: 'Please try again later.',
    });
};
