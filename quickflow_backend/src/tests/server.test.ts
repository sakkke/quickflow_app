import { describe, it, expect } from "bun:test";
import app from "../server";
import { fetch } from "bun";

describe("Server", () => {
  it('should respond with "Hello Hono!"', async () => {
    const res = await fetch("http://localhost:3000/");
    const text = await res.text();
    expect(text).toBe("Hello Hono!");
  });

  it("should fetch railways", async () => {
    const res = await fetch("http://localhost:3000/railways");
    const json = await res.json();
    expect(Array.isArray(json)).toBe(true);
  });

  it("should fetch stations", async () => {
    const res = await fetch("http://localhost:3000/stations");
    const json = await res.json();
    expect(Array.isArray(json)).toBe(true);
  });

  it("should fetch routes", async () => {
    const res = await fetch("http://localhost:3000/routes");
    const json = await res.json();
    expect(Array.isArray(json)).toBe(true);
  });

  it("should fetch crowd entries", async () => {
    const res = await fetch("http://localhost:3000/crowd");
    const json = await res.json();
    expect(Array.isArray(json)).toBe(true);
  });
});
