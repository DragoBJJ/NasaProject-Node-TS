import { getAllLaunchesModel, existsLaunch, abordLaunchByID, createNewLaunch, } from "../../models/launches.model";
import { getPagination } from "../../services/query";
import { handleError } from "../../utils";
export const getAllLaunches = async (req, res) => {
    const { skip, limitPage } = getPagination(req.query);
    const allLaunches = await getAllLaunchesModel(skip, limitPage);
    return res.status(200).json(allLaunches);
};
export const addNewLaunch = async (req, res) => {
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
    await createNewLaunch(newLaunch);
    return res.status(201).json(newLaunch);
};
export const abordLaunch = async (req, res) => {
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
