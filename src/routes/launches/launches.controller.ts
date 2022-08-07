import { Request, Response } from "express";
import {
  getAllLaunchesModel,
  existsLaunch,
  abordLaunchByID,
  createNewLaunch,
  Launch,
} from "../../models/launches.model";
import { handleError } from "../../utils";

export const getAllLaunches = async (req: Request, res: Response) => {
  return res.status(200).json(await getAllLaunchesModel());
};

export const addNewLaunch = async (req: Request, res: Response) => {
  const newLaunch: Launch = req.body;
  if (handleError(newLaunch)) {
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }
  newLaunch.launchDate = new Date(newLaunch.launchDate);
  if (isNaN(newLaunch.launchDate.valueOf())) {
    return res.status(400).json({
      error: "Invalid launch Date",
    });
  }
  await createNewLaunch(newLaunch);
  return res.status(201).json(newLaunch);
};

export const abordLaunch = async (req: Request, res: Response) => {
  const launchID = +req.params.id;
  if (!(await existsLaunch(launchID))) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }
  const abordedLaunch = await abordLaunchByID(launchID);
  if (!abordedLaunch) {
    return res.status(400).json({
      error: "Launch not aborted",
    });
  }
  return res.status(200).json(abordedLaunch);
};
