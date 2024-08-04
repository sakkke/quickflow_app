import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:3000/api",
});

export const fetchRailways = async () => {
  const response = await api.get("/railways");
  return response.data;
};

export const fetchStations = async () => {
  const response = await api.get("/stations");
  return response.data;
};

export const fetchRoutes = async () => {
  const response = await api.get("/routes");
  return response.data;
};

export const fetchCrowd = async () => {
  const response = await api.get("/crowd");
  return response.data;
};

export const updateCrowdLevel = async (id: string, crowdLevel: number) => {
  await api.patch(`/crowd/${id}`, { crowdLevel });
};
