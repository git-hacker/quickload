import * as mongoose from 'mongoose';

export const ShipmentLogSchema = new mongoose.Schema({
    driverid: String,
    shipments: [String],
});