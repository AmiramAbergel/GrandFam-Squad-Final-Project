import express, { json } from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import indexRoute from './routes/index.routes.js';
import { connectToDB } from './db/mongoose.js';
import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/error.controller.js';
import { subscribe } from './controllers/user.controllers.js';

export const app = express(); // Create our Express Application Object
const __dirname = path.dirname(fileURLToPath(import.meta.url));
//const publicPath = path.join(__dirname, '../client/build');
const publicPath = path.join(__dirname, '../client/public');
app.enable('trust proxy'); // Trust the proxy for secure headers (https)

const PORT = process.env.PORT || 3000; // Set the Port

const BASE_URL = '/api/v1';
app.use(cors()); // Allow Cross Origin Requests
app.options('*', cors()); // Allow Cross Origin Requests
// app.get('/service-worker.js', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'public', 'service-worker.js'));
// });
// app.get('*', (req, res) => {
//     // Serve the React App from the build folder in production
//     res.sendFile(path.join(publicPath, 'index.html'));
// });
app.post('/subscribe', subscribe);
app.use(json({ limit: '10kb' })); // Parse JSON Data
app.use(express.urlencoded({ extended: true, limit: '10kb' })); // Parse URL Encoded Data
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
