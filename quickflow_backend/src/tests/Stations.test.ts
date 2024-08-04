import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import { Railways } from "../models/Railways";
import { Stations } from "../models/Stations";
import { adminAuth, pb } from "../pocketbase";

let testRailway: Railways;

const clearCollection = async (collectionName: string) => {
  const records = await pb.collection(collectionName).getFullList();
  for (const record of records) {
    await pb.collection(collectionName).delete(record.id);
  }
};

beforeAll(async () => {
  await adminAuth("example@example.com", "1234567890");
  clearCollection("stations");
  testRailway = new Railways("Test Railway");
  await testRailway.save();
});

describe("Stations", () => {
  it("should create a new station", async () => {
    const station = new Stations(testRailway, "Test Station");
    await station.save();
    expect(station.id).toBeDefined();
  });

  it("should fetch all stations", async () => {
    const stations = await Stations.fetchAll();
    expect(stations.length).toBeGreaterThan(0);
  });
});

afterAll(async () => {
  clearCollection("stations");
});
