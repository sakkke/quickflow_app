import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import { Railways } from "../models/Railways";
import { Stations } from "../models/Stations";
import { Routes } from "../models/Routes";
import { Direction } from "../models/Direction";
import { pb } from "../pocketbase";

let testRailway: Railways;
let testStation: Stations;

beforeAll(async () => {
  await pb.collection("routes").clear();
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
  await pb.collection("routes").clear();
});
