/** @jsxImportSource hono/jsx */
import { Context } from "hono";
import { fetchCrowd, updateCrowdLevel } from "../services/api";

export const UserConsole = async (c: Context) => {
  const crowd = await fetchCrowd();

  const handleCrowdLevelChange = async (id: string, level: number) => {
    await updateCrowdLevel(id, level);
  };

  return (
    <html>
      <head>
        <title>User Console</title>
      </head>
      <body>
        <h1>User Console</h1>
        {crowd.map((entry) => (
          <div key={entry.id}>
            <p>Route: {entry.route.id}</p>
            <div>
              <label>
                <input
                  type="radio"
                  name={`crowdLevel-${entry.id}`}
                  value="0"
                  checked={entry.crowdLevel === 0}
                  onChange={() => handleCrowdLevelChange(entry.id, 0)}
                />
                Comfortable
              </label>
              <label>
                <input
                  type="radio"
                  name={`crowdLevel-${entry.id}`}
                  value="1"
                  checked={entry.crowdLevel === 1}
                  onChange={() => handleCrowdLevelChange(entry.id, 1)}
                />
                Crowded
              </label>
              <label>
                <input
                  type="radio"
                  name={`crowdLevel-${entry.id}`}
                  value="2"
                  checked={entry.crowdLevel === 2}
                  onChange={() => handleCrowdLevelChange(entry.id, 2)}
                />
                Full
              </label>
            </div>
          </div>
        ))}
      </body>
    </html>
  );
};
