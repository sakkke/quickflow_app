import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import { Railways } from "../models/Railways";
import { Stations } from "../models/Stations";
import { Routes } from "../models/Routes";
import { Direction } from "../models/Direction";
import { pb } from "../pocketbase";

let testRailway: Railways;
let testStation: Stations;

const clearCollection = async (collectionName: string) => {
  const records = await pb.collection(collectionName).getFullList();
  for (const record of records) {
    await pb.collection(collectionName).delete(record.id);
  }
};

beforeAll(async () => {
  clearCollection("routes");
  testRailway = new Railways("Test Railway");
  await testRailway.save();
  testStation = new Stations(testRailway, "Test Station");
  await testStation.save();
});

describe("Routes", () => {
  it("should create a new route", async () => {
    const route = new Routes(testStation, Direction.UP, 30, 10);
    await route.save();
    expect(route.id).toBeDefined();
  });

  it("should fetch all routes", async () => {
    const routes = await Routes.fetchAll();
    expect(routes.length).toBeGreaterThan(0);
  });
});

afterAll(async () => {
  clearCollection("routes");
});
