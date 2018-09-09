export class Drivers {
    public readonly id: string;
    public readonly Name: string;
    public readonly License: string;
    public readonly Origin: string;
    public readonly Destination: string;
    public readonly TruckType: {
        Length: number;
        Weight: number;
        Axels: number;
        Type: string;
    };
}