const launches = new Map();
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
let latestFlightNumber = 100;
launches.set(launch.flightNumber, launch);
export const getAllLaunchesModel = () => {
    return Array.from(launches.values());
};
export const createNewLaunch = (launch) => {
    latestFlightNumber++;
    const newLauch = Object.assign(Object.assign({}, launch), { flightNumber: latestFlightNumber, success: true, upcoming: true, customers: ["Zero To Mastery", "NASA", "SpaceX"] });
    launches.set(latestFlightNumber, newLauch);
};
export const existsLaunch = (launchID) => {
    return launches.has(launchID);
};
export const abordLaunchByID = (launchID) => {
    const deletedLaunch = launches.get(launchID);
    if (!deletedLaunch)
        return;
    deletedLaunch.upcoming = false;
    deletedLaunch.success = false;
    return deletedLaunch;
};
