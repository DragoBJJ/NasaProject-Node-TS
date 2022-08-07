import { LaunchesModel } from "./launches.mongo";
import { PlanetModel } from "./planets.mongo";
const launch = {
    flightNumber: 100,
    mission: "Kepler Exploration X",
    rocket: "Explorer IS1",
    launchDate: new Date("December 27, 2030"),
    target: "Kepler-442 b",
    customer: ["ZTM", "NASA"],
    upcoming: true,
    success: true,
};
const DEFAULT_FLIGHT_NUMBER = 100;
const saveLaunch = async (launch) => {
    const planet = await PlanetModel.findOne({
        keplerName: launch.target,
    });
    if (!planet)
        throw new Error("No matching planet found");
    await LaunchesModel.findOneAndUpdate({ flightNumber: launch.flightNumber }, launch, {
        upsert: true,
    });
};
const getLatestFlightNumber = async () => {
    const latestLaunch = await LaunchesModel.findOne({}).sort("-flightNumber");
    if (!latestLaunch)
        return DEFAULT_FLIGHT_NUMBER;
    return latestLaunch["flightNumber"];
};
saveLaunch(launch);
export const getAllLaunchesModel = async () => {
    return await LaunchesModel.find({}, {
        _id: 0,
        __v: 0,
    });
};
export const createNewLaunch = async (launch) => {
    const newFlightNumber = (await getLatestFlightNumber()) + 1;
    if (!newFlightNumber)
        return;
    const newLauch = Object.assign(Object.assign({}, launch), { flightNumber: newFlightNumber, success: true, upcoming: true, customers: ["Zero To Mastery", "NASA", "SpaceX"] });
    await saveLaunch(newLauch);
};
export const existsLaunch = async (launchID) => {
    return await LaunchesModel.findOne({
        flightNumber: launchID,
    });
};
export const abordLaunchByID = async (launchID) => {
    const aborted = await LaunchesModel.updateOne({
        flightNumber: launchID,
    }, {
        upcoming: false,
        success: false,
    });
    return aborted;
};
