import { getAllLaunchesModel, createNewLaunch, existsLaunch, abordLaunchByID, } from "../../models/launches.model";
import { handleError } from "../../utils";
export const getAllLaunches = (req, res) => {
    return res.status(200).json(getAllLaunchesModel());
};
export const addNewLaunch = (req, res) => {
    const newLaunch = req.body;
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
    createNewLaunch(newLaunch);
    return res.status(201).json(newLaunch);
};
export const abordLaunch = (req, res) => {
    const launchID = +req.params.id;
    if (!existsLaunch(launchID)) {
        return res.status(404).json({
            error: "Launch not found",
        });
    }
    const abordedLaunch = abordLaunchByID(launchID);
    if (!abordedLaunch) {
        return res.status(404).json({
            error: "Launch not found",
        });
    }
    return res.status(200).json(abordedLaunch);
};
