import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import { Railways } from "../models/Railways";
import { pb } from "../pocketbase";

const clearCollection = async (collectionName: string) => {
  const records = await pb.collection(collectionName).getFullList();
  for (const record of records) {
    await pb.collection(collectionName).delete(record.id);
  }
};

beforeAll(() => {
  clearCollection("railways");
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
  clearCollection("railways");
});
