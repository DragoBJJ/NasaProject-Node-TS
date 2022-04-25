import { createServer } from "http";
import planetsData from "./models/planets.model";
import app from "./app";
const server = createServer(app);
const PORT = process.env.PORT || 8000;
const startServer = async () => {
    await planetsData.loadPlanetsData();
    server.listen(PORT, () => {
        console.log("Hello World");
    });
};
startServer();
