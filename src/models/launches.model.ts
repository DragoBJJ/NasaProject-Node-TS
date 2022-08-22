import { getSpaceXData } from "../utils/getData";
import { LaunchesModel } from "./launches.mongo";
import { PlanetModel } from "./planets.mongo";

export type Launch = {
  flightNumber: number;
  mission: string;
  rocket: string;
  launchDate: Date;
  success: boolean;
  target: string;
  customer: string[];
  upcoming: boolean;
};

const DEFAULT_FLIGHT_NUMBER = 100;

export const saveLaunch = async (launch: Launch) => {
  await LaunchesModel.findOneAndUpdate(
    { flightNumber: launch.flightNumber },
    launch,
    {
      upsert: true,
    }
  );
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
  if (!latestLaunch) return DEFAULT_FLIGHT_NUMBER;
  return latestLaunch["flightNumber"];
};

export const getAllLaunchesModel = async (skip: number, limit: number) => {
  return await LaunchesModel.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  )
    .sort({
      flightNumber: 1,
    })
    .skip(skip)
    .limit(limit);
};

export const createNewLaunch = async (launch: Launch) => {
  const planet = await PlanetModel.findOne({
    keplerName: launch.target,
  });
  if (!planet) throw new Error("No matching planet found");
  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  if (!newFlightNumber) return;
  const newLauch = {
    ...launch,
    flightNumber: newFlightNumber,
    success: true,
    upcoming: true,
    customers: ["Zero To Mastery", "NASA", "SpaceX"],
  };

  await saveLaunch(newLauch);
};

export const findLaunch = async (filter: any) => {
  return await LaunchesModel.findOne(filter);
};

export const existsLaunch = async (launchID: Launch["flightNumber"]) => {
  return await findLaunch({
    flightNumber: launchID,
  });
};

export const abordLaunchByID = async (launchID: Launch["flightNumber"]) => {
  const aborted = await LaunchesModel.updateOne(
    {
      flightNumber: launchID,
    },
    {
      upcoming: false,
      success: false,
    }
  );
  return aborted;
};
