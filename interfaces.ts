import { Document } from 'mongoose';

export interface IConfig extends Document {
    chatname: string;
}