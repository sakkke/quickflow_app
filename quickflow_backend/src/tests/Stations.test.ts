import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import { Railways } from "../models/Railways";
import { Stations } from "../models/Stations";
import { pb } from "../pocketbase";

let testRailway: Railways;

beforeAll(async () => {
  await pb.collection("stations").clear();
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
  await pb.collection("stations").clear();
});
