import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import { Railways } from "../models/Railways";
import { Stations } from "../models/Stations";
import { Routes } from "../models/Routes";
import { Crowd } from "../models/Crowd";
import { Direction } from "../models/Direction";
import { CrowdLevel } from "../models/CrowdLevel";
import { adminAuth, pb } from "../pocketbase";

let testRailway: Railways;
let testStation: Stations;
let testRoute: Routes;

const clearCollection = async (collectionName: string) => {
  const records = await pb.collection(collectionName).getFullList();
  for (const record of records) {
    await pb.collection(collectionName).delete(record.id);
  }
};

beforeAll(async () => {
  await adminAuth("example@example.com", "1234567890");
  await clearCollection("crowd");
  testRailway = new Railways("Test Railway");
  await testRailway.save();
  testStation = new Stations(testRailway, "Test Station");
  await testStation.save();
  testRoute = new Routes(testStation, Direction.UP, 30, 10);
  await testRoute.save();
});

describe("Crowd", () => {
  it("should create a new crowd entry", async () => {
    const crowd = new Crowd(testRoute, 1, CrowdLevel.COMFORTABLE);
    await crowd.save();
    expect(crowd.id).toBeDefined();
  });

  it("should fetch all crowd entries", async () => {
    const crowds = await Crowd.fetchAll();
    expect(crowds.length).toBeGreaterThan(0);
  });
});

afterAll(async () => {
  await clearCollection("crowd");
});
