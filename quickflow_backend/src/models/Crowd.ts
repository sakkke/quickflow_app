import { pb } from "../pocketbase";
import { Routes } from "./Routes";
import { CrowdLevel } from "./CrowdLevel";

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
    const crowds = await Promise.all(
      records.map(async (record) => {
        const route = await Routes.fetchById(record.route);
        return new Crowd(route, record.index, record.crowdLevel as CrowdLevel);
      })
    );
    return crowds;
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
