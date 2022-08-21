import axios from "axios";
import { saveLaunch } from "../models/launches.model";
export const getSpaceXData = async () => {
    const SPACE_X_API_URL = process.env.SPACE_X_API_URL;
    if (!SPACE_X_API_URL)
        return;
    console.log("Downloading SpaceXData...");
    const response = await axios.post(SPACE_X_API_URL, {
        query: {},
        options: {
            pagination: false,
            populate: [
                {
                    path: "rocket",
                    select: {
                        name: 1,
                    },
                },
                {
                    path: "payloads",
                    select: {
                        customers: 1,
                    },
                },
            ],
        },
    });
    if (response.status !== 200) {
        console.log("Problem dowloading launch data");
        throw new Error("Launch data dowload failed !");
    }
    response.data.docs.map((launch) => {
        const payloads = launch["payloads"];
        const customers = payloads.flatMap((payload) => {
            return payload["customers"];
        });
        const launchMissionData = {
            flightNumber: launch["flight_number"],
            target: "Kepler-62 f",
            mission: launch["name"],
            rocket: launch["rocket"]["name"],
            launchDate: launch["date_local"],
            upcoming: launch["upcoming"],
            success: launch["success"],
            customers: customers,
        };
        saveLaunch(Object.assign({}, launchMissionData));
    });
};
