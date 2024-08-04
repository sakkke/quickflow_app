/** @jsxImportSource hono/jsx */
import { Context } from "hono";
import {
  fetchRailways,
  fetchStations,
  fetchRoutes,
  fetchCrowd,
} from "../services/api";
import { updateCrowdLevel } from "../services/api";

export const AdminConsole = async (c: Context) => {
  const railways = await fetchRailways();
  const stations = await fetchStations();
  const routes = await fetchRoutes();
  const crowd = await fetchCrowd();

  const handleCrowdLevelChange = async (id: string, level: number) => {
    await updateCrowdLevel(id, level);
    // ページの再読み込みや状態の更新が必要ならここで行う
  };

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
                <td>
                  <input
                    type="radio"
                    name="crowdLevel"
                    id="crowdLevel0"
                    checked={entry.crowdLevel === 0}
                  />
                  <input
                    type="radio"
                    name="crowdLevel"
                    id="crowdLevel1"
                    checked={entry.crowdLevel === 1}
                  />
                  <input
                    type="radio"
                    name="crowdLevel"
                    id="crowdLevel2"
                    checked={entry.crowdLevel === 2}
                  />
                </td>
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
