import * as mongoose from 'mongoose';

export const ShipmentSchema = new mongoose.Schema({
    ID: String,
    ShipperName: String,
    Price: String,
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
        TypesNotMixable: Array,
    },
    Shipped: Boolean,
})