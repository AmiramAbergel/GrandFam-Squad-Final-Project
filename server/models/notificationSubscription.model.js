import mongoose from 'mongoose';
const { Schema } = mongoose;

const subscriptionSchema = new Schema({
    endpoint: String,
    expirationTime: Number,
    keys: {
        auth: String,
        p256dh: String,
    },
});

export const Subscription = mongoose.model('Subscription', subscriptionSchema);
