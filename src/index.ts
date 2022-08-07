import { createServer } from "http";
import planetsData from "./models/planets.model";
import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const server = createServer(app);

mongoose.connection.on("open", () => {
  console.log("MongoDB connection ready");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

const PORT = process.env.PORT || 8000;
const DATABASE_URL = process.env.API_DATABASE;

const startServer = async () => {
  if (!DATABASE_URL) return;
  await mongoose.connect(DATABASE_URL);
  await planetsData.loadPlanetsData();
  server.listen(PORT, () => {
    console.log("Hello World");
  });
};
startServer();
