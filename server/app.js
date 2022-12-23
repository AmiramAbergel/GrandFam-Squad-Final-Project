import express, { json } from 'express';
import cors from 'cors';
import indexRoute from './routes/index.routes.js';
import { connectToDB } from './db/server.js';

export const app = express(); // Create our Express Application Object

const PORT = process.env.PORT || 3000;
const BASE_URL = '/api/v1';
app.use(cors()); // Allow Cross Origin Requests
app.use(json()); // Parse JSON Data
app.use(BASE_URL, indexRoute); // /api/v1

//run the function so we are connected to the database
connectToDB(); // Connect to MongoDB
// Server Listener
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`));
