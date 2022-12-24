import dotenv from 'dotenv';
dotenv.config(); // Load ENV Variables
console.log(dotenv.config());
import mongoose from 'mongoose';
mongoose.set('strictQuery', true);
const DB = process.env.MONGO_URL;
const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

//async function so we can connect to the database
//throws an error if the connection fails
export const connectToDB = async () => {
    try {
        await mongoose.connect(DB, config); // Database Connection
        console.log(`connected to the database`);
    } catch (e) {
        console.log(`error connecting to the db: ${e}`);
    }
};
