import * as mongoose from 'mongoose';

export const DriverSchema = new mongoose.Schema({
    ID:  String,
    Name: String,
    License: Number,
    TruckType: {
        Length: Number,
        Weight: Number,
        Axels: Number,
        Type: Array,
    },
    Origin: String,
    Destination: String,
})