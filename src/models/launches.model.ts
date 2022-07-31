const launches: Map<number, Launch> = new Map();

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
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};
let latestFlightNumber = 100;

launches.set(launch.flightNumber, launch);

export const getAllLaunchesModel = () => {
  return Array.from(launches.values());
};

export const createNewLaunch = (launch: Launch) => {
  latestFlightNumber++;
  const newLauch = {
    ...launch,
    flightNumber: latestFlightNumber,
    success: true,
    upcoming: true,
    customers: ["Zero To Mastery", "NASA", "SpaceX"],
  };
  launches.set(latestFlightNumber, newLauch);
};

export const existsLaunch = (launchID: Launch["flightNumber"]) => {
  return launches.has(launchID);
};

export const abordLaunchByID = (launchID: Launch["flightNumber"]) => {
  const deletedLaunch = launches.get(launchID);
  if (!deletedLaunch) return;
  deletedLaunch.upcoming = false;
  deletedLaunch.success = false;
  return deletedLaunch;
};
