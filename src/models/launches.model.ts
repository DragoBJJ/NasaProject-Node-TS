import axios from "axios";
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

const launch: Launch = {
  flightNumber: 100, // flight_number
  mission: "Kepler Exploration X", // name
  rocket: "Explorer IS1", // rocket.name
  launchDate: new Date("December 27, 2030"), //date_local
  target: "Kepler-442 b", // not Applicable
  customer: ["ZTM", "NASA"], // payload.customers for each payload
  upcoming: true, // upcomming
  success: true, // success
};

const DEFAULT_FLIGHT_NUMBER = 100;

const saveLaunch = async (launch: Launch) => {
  const planet = await PlanetModel.findOne({
    keplerName: launch.target,
  });

  if (!planet) throw new Error("No matching planet found");

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
    rocket: "Falcon1 ",
    mission: "FalconSat",
  });
  if (firstLaunch) {
    console.log("First Launch is already exist");
    return;
  }
  const launchData = await getSpaceXData();
};

const getLatestFlightNumber = async () => {
  const latestLaunch = await LaunchesModel.findOne({}).sort("-flightNumber");
  if (!latestLaunch) return DEFAULT_FLIGHT_NUMBER;
  return latestLaunch["flightNumber"];
};

saveLaunch(launch);

export const getAllLaunchesModel = async () => {
  return await LaunchesModel.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
};

export const createNewLaunch = async (launch: Launch) => {
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
