import express from "express";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import { planetsRouter } from "./routes/planets/planets.router";
import { launchesRouter } from "./routes/launches/launches.router";
const app = express();
app.use(cors({
    origin: "http://localhost:3000",
}));
app.use(morgan("combined"));
app.use(express.json());
app.use(express.static(path.join(path.resolve(), "public")));
app.use("/planets", planetsRouter);
app.use("/launches", launchesRouter);
app.get("/*", (req, res) => {
    return res.sendFile(path.join(path.resolve(), "public", "index.html"));
});
export default app;
