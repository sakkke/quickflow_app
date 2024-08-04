import { Hono } from "hono";
import { AdminConsole } from "./components/AdminConsole";
import { UserConsole } from "./components/UserConsole";
import { Railways } from "./models/Railways";
import { Stations } from "./models/Stations";
import { Routes } from "./models/Routes";
import { Crowd } from "./models/Crowd";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/admin", async (c) => {
  return await c.html(AdminConsole(c));
});
app.get("/user", async (c) => {
  return await c.html(UserConsole(c));
});

app.get("/railways", async (c) => {
  const railways = await Railways.fetchAll();
  return c.json(railways);
});

app.get("/stations", async (c) => {
  const stations = await Stations.fetchAll();
  return c.json(stations);
});

app.get("/routes", async (c) => {
  const routes = await Routes.fetchAll();
  return c.json(routes);
});

app.get("/crowd", async (c) => {
  const crowd = await Crowd.fetchAll();
  return c.json(crowd);
});

export default app;
