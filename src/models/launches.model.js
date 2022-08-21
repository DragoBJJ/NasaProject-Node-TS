import { getSpaceXData } from "../utils/getData";
import { LaunchesModel } from "./launches.mongo";
import { PlanetModel } from "./planets.mongo";
const launch = {
    flightNumber: 100,
    mission: "Kepler Exploration X",
    rocket: "Explorer IS1",
    launchDate: new Date("December 27, 2030"),
    target: "Kepler-442 b",
    customers: ["ZTM", "NASA"],
    upcoming: true,
    success: true, // success
};
const DEFAULT_FLIGHT_NUMBER = 100;
export const saveLaunch = async (launch) => {
    await LaunchesModel.findOneAndUpdate({ flightNumber: launch.flightNumber }, launch, {
        upsert: true,
    });
};
export const loadSpaceXData = async () => {
    const firstLaunch = await findLaunch({
        flightNumber: 1,
        rocket: "Falcon 1",
        mission: "FalconSat",
    });
    if (firstLaunch) {
        console.log("First Launch is already exist");
        return;
    }
    await getSpaceXData();
};
const getLatestFlightNumber = async () => {
    const latestLaunch = await LaunchesModel.findOne({}).sort("-flightNumber");
    if (!latestLaunch)
        return DEFAULT_FLIGHT_NUMBER;
    return latestLaunch["flightNumber"];
};
export const getAllLaunchesModel = async () => {
    return await LaunchesModel.find({}, {
        _id: 0,
        __v: 0,
    });
};
export const createNewLaunch = async (launch) => {
    const planet = await PlanetModel.findOne({
        keplerName: launch.target,
    });
    if (!planet)
        throw new Error("No matching planet found");
    const newFlightNumber = (await getLatestFlightNumber()) + 1;
    if (!newFlightNumber)
        return;
    const newLauch = Object.assign(Object.assign({}, launch), { flightNumber: newFlightNumber, success: true, upcoming: true, customers: ["Zero To Mastery", "NASA", "SpaceX"] });
    await saveLaunch(newLauch);
};
export const findLaunch = async (filter) => {
    return await LaunchesModel.findOne(filter);
};
export const existsLaunch = async (launchID) => {
    return await findLaunch({
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
