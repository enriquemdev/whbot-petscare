import mongoose, { Schema } from 'mongoose';
import { IConfig } from './interfaces'

const configSchema: Schema = new Schema({
    chatname: {type: String, required: true},
});

export const Config = mongoose.model<IConfig>('Config', configSchema);