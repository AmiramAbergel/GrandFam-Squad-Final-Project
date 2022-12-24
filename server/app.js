import express, { json } from 'express';
import cors from 'cors';
import indexRoute from './routes/index.routes.js';
import { connectToDB } from './db/mongoose.js';
import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/error.controller.js';
export const app = express(); // Create our Express Application Object

const PORT = process.env.PORT || 3000; // Set the Port

const BASE_URL = '/api/v1';
app.use(cors()); // Allow Cross Origin Requests
app.use(json()); // Parse JSON Data
app.use(BASE_URL, indexRoute); // '/api/v1' is the base url for all routes
app.all('*', (req, res, next) => {
    next(AppError(`Can't find ${req.originalUrl} on this server!`, 404));
}); // Handle all other routes

app.use(globalErrorHandler);

//run the function so we are connected to the database
connectToDB(); // Connect to MongoDB
// Server Listener
const server = app.listen(PORT, () =>
    console.log(`Now Listening on port ${PORT}`)
);

process.on('unhandledRejection', (err) => {
    // Handle unhandled promise rejections (e.g. database connection error)
    console.log(err.name, err.message);
    server.close(() => {
        console.log('Closing server due to unhandled rejection');
        process.exit(1);
    });
});

process.on(
    'SIGTERM',
    () => {
        // Handle SIGTERM (e.g. aws ec2 instance termination)
        console.log('Received SIGTERM, shutting down gracefully');
        server.close(() => {
            console.log('Closed out remaining connections');
            process.exit(0);
        });
    },
    3000
);
