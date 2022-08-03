import { createServer } from "http";
import planetsData from "./models/planets.model";
import app from "./app";
import mongoose from "mongoose";

const server = createServer(app);

mongoose.connection.on("open", () => {
  console.log("MongoDB connection ready");
});

mongoose.connection.on("error", (err) => {
  console.log("MongoDB error", err);
});

const PORT = process.env.PORT || 8000;
const DATABSE_URL = process.env.API_DATABASE;

const startServer = async () => {
  if (!DATABSE_URL) return;
  await mongoose.connect(DATABSE_URL);
  await planetsData.loadPlanetsData();
  server.listen(PORT, () => {
    console.log("Hello World");
  });
};
startServer();
