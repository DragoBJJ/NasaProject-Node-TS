import { createServer } from "http";
import planetsData from "./models/planets.model";
import app from "./app";
import dotenv from "dotenv";
import { connectToDB } from "./services/mongo";
dotenv.config();
const server = createServer(app);
const PORT = process.env.PORT || 8000;
const startServer = async () => {
  await connectToDB();
  await planetsData.loadPlanetsData();
  server.listen(PORT, () => {
    console.log("Hello World");
  });
};
startServer();
