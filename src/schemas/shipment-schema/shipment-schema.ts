import * as mongoose from 'mongoose';

export const ShipmentSchema = new mongoose.Schema({
    id: String,
    ShipperName: String,
    Price: Number,
    Origin: String,
    Destination: String,
    RequiredTruckInformation: {
        RequiredTruckType: Array,
        Weight: Number,
        Length: Number,
        Full: Boolean,
    },
    CargoInformation: {
        TypeName: Array,
    },
    Shipped: Boolean,
});