import express from "express";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import { api } from "./routes/api";
const app = express();
app.use(cors({
    origin: "http://localhost:3000",
}));
app.use(morgan("combined"));
app.use(express.json());
app.use(express.static(path.join(path.resolve(), "public")));
app.use("/v1", api);
app.get("/*", (req, res) => {
    return res.sendFile(path.join(path.resolve(), "public", "index.html"));
});
export default app;
