import { pb } from "../pocketbase";
import { Stations } from "./Stations";
import { Direction } from "./Direction";

export class Routes {
    id?: string;
    station: Stations;
    direction: Direction;
    time: number;
    railwayLength: number;

    constructor(
        station: Stations,
        direction: Direction,
        time: number,
        railwayLength: number
    ) {
        this.station = station;
        this.direction = direction;
        this.time = time;
        this.railwayLength = railwayLength;
    }

    static async fetchAll(): Promise<Routes[]> {
        const records = await pb.collection("routes").getFullList();
        return records.map(
            (record) =>
                new Routes(
                    new Stations(
                        new Railways(record.station.railway),
                        record.station.name
                    ),
                    record.direction as Direction,
                    record.time,
                    record.railwayLength
                )
        );
    }

    async save() {
        const record = await pb.collection("routes").create({
            station: this.station.id,
            direction: this.direction,
            time: this.time,
            railwayLength: this.railwayLength,
        });
        this.id = record.id;
    }
}
