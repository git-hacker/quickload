import { Document } from 'mongoose';
export interface Shipments extends Document {
    public readonly id: string;
    public readonly ShipperName: string;
    public readonly Price: number;
    public readonly Origin: string;
    public readonly Destination: string;
    public readonly RequiredTruckInformation: {
        RequiredTruckType: any;
        Weight: number;
        length: number;
        Full: boolean;
    };
    public readonly CargoInformation: {
        TypeName: any;
    };
    public readonly Shipped: boolean;
}