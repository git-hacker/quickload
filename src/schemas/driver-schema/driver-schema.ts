import * as mongoose from 'mongoose';

export const DriverSchema = new mongoose.Schema({
    id:  String,
    Name: String,
    License: Number,
    Origin: String,
    Destination: String,
    TruckType: {
        Length: Number,
        Weight: Number,
        Axels: Number,
        Type: String,
    },
});