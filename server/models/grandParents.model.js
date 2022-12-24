import mongoose from 'mongoose';
import validator from 'validator';
const { Schema } = mongoose;

const grandParentsSchema = new Schema({});

export const GrandParents = mongoose.model('GrandParents', grandParentsSchema);
