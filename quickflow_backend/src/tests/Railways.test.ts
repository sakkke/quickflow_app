import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import { Railways } from "../models/Railways";
import { pb } from "../pocketbase";

beforeAll(() => {
  pb.collection("railways").clear();
});

describe("Railways", () => {
  it("should create a new railway", async () => {
    const railway = new Railways("Test Railway");
    await railway.save();
    expect(railway.id).toBeDefined();
  });

  it("should fetch all railways", async () => {
    const railways = await Railways.fetchAll();
    expect(railways.length).toBeGreaterThan(0);
  });
});

afterAll(() => {
  pb.collection("railways").clear();
});
