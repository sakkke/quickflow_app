import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import { Railways } from "../models/Railways";
import { Stations } from "../models/Stations";
import { Routes } from "../models/Routes";
import { Direction } from "../models/Direction";
import { adminAuth, pb } from "../pocketbase";

const clearCollection = async (collectionName: string) => {
  const records = await pb.collection(collectionName).getFullList();
  for (const record of records) {
    await pb.collection(collectionName).delete(record.id);
  }
};

let testRailway: Railways;
let testStation: Stations;

beforeAll(async () => {
  await adminAuth("example@example.com", "1234567890");
  await clearCollection("routes");
  await clearCollection("stations");
  await clearCollection("railways");

  testRailway = new Railways("Test Railway");
  await testRailway.save();

  // 確実にリソースが作成されるようにする
  testRailway = await pb.collection("railways").getOne(testRailway.id!);

  testStation = new Stations(testRailway, "Test Station");
  await testStation.save();

  // 確実にリソースが作成されるようにする
  testStation = await pb.collection("stations").getOne(testStation.id!);
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
  await clearCollection("routes");
  await clearCollection("stations");
  await clearCollection("railways");
});
