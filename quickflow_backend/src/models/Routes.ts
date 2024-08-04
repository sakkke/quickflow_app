import { pb } from "../pocketbase";
import { Stations } from "./Stations";
import { Direction } from "./Direction";
import { Railways } from "./Railways";

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

  static async fetchById(id: string): Promise<Routes> {
    const record = await pb.collection("routes").getOne(id);
    const stationData = await pb.collection("stations").getOne(record.station);
    const railwayData = await pb
      .collection("railways")
      .getOne(stationData.railway);
    const railway = new Railways(railwayData.name);
    const station = new Stations(railway, stationData.name);
    return new Routes(
      station,
      record.direction as Direction,
      record.time,
      record.railwayLength
    );
  }

  static async fetchAll(): Promise<Routes[]> {
    const records = await pb.collection("routes").getFullList();
    return await Promise.all(
      records.map(async (record) => {
        const stationData = await pb
          .collection("stations")
          .getOne(record.station);
        const railwayData = await pb
          .collection("railways")
          .getOne(stationData.railway);
        const railway = new Railways(railwayData.name);
        const station = new Stations(railway, stationData.name);
        return new Routes(
          station,
          record.direction as Direction,
          record.time,
          record.railwayLength
        );
      })
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
