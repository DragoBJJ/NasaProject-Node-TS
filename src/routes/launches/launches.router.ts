import express from "express";
import {
  getAllLaunches,
  addNewLaunch,
  abordLaunch,
} from "./launches.controller";

export const launchesRouter = express.Router();

launchesRouter.get("/", getAllLaunches);
launchesRouter.post("/", addNewLaunch);
launchesRouter.delete("/:id", abordLaunch);
