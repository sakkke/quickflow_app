import { pb } from "../pocketbase";
import { Routes } from "./Routes";
import { CrowdLevel } from "./CrowdLevel";
import { Direction } from "./Direction";
import { Railways } from "./Railways";
import { Stations } from "./Stations";

export class Crowd {
  id?: string;
  route: Routes;
  index: number;
  crowdLevel: CrowdLevel;

  constructor(route: Routes, index: number, crowdLevel: CrowdLevel) {
    this.route = route;
    this.index = index;
    this.crowdLevel = crowdLevel;
  }

  static async fetchAll(): Promise<Crowd[]> {
    const records = await pb.collection("crowd").getFullList();
    return records.map(
      (record) =>
        new Crowd(
          new Routes(
            new Stations(
              new Railways(record.route.station.railway),
              record.route.station.name
            ),
            record.route.direction as Direction,
            record.route.time,
            record.route.railwayLength
          ),
          record.index,
          record.crowdLevel as CrowdLevel
        )
    );
  }

  async save() {
    const record = await pb.collection("crowd").create({
      route: this.route.id,
      index: this.index,
      crowdLevel: this.crowdLevel,
    });
    this.id = record.id;
  }
}
