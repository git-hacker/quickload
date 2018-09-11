import { Document } from 'mongoose';
export interface ShipmentLog extends Document {
    public readonly driverid: string;
    public readonly shipments: [string];
}