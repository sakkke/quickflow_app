/** @jsxImportSource hono/jsx */
import { Context } from "hono";
import {
  fetchRailways,
  fetchStations,
  fetchRoutes,
  fetchCrowd,
} from "../services/api";

export const AdminConsole = async (c: Context) => {
  const railways = await fetchRailways();
  const stations = await fetchStations();
  const routes = await fetchRoutes();
  const crowd = await fetchCrowd();

  return (
    <html>
      <head>
        <title>Admin Console</title>
      </head>
      <body>
        <h1>Admin Console</h1>
        <table>
          <thead>
            <tr>
              <th>Railway Name</th>
              <th>Index</th>
              <th>Crowd Level</th>
            </tr>
          </thead>
          <tbody>
            {crowd.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.route.station.railway.name}</td>
                <td>{entry.index}</td>
                <td>{entry.crowdLevel}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <hr />
        {crowd.map((entry) => (
          <p>{JSON.stringify(entry)}</p>
        ))}
      </body>
    </html>
  );
};
