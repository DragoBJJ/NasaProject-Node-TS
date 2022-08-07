import { parse } from "csv-parse";
import path from "path";
import fs from "fs";
import { PlanetModel } from "./planets.mongo";
const isHabitablePlanets = (planet) => {
    const I = planet["koi_disposition"] === "CONFIRMED";
    const II = planet["koi_insol"] > 0.36 && planet["koi_insol"] < 1.11;
    const III = planet["koi_prad"] < 1.6;
    return I && II && III;
};
export const getPlanetsData = async () => {
    return await PlanetModel.find({});
};
const savePlanet = async (planet) => {
    try {
        await PlanetModel.updateOne({
            keplerName: planet.kepler_name,
        }, { keplerName: planet.kepler_name }, { upsert: true });
    }
    catch (error) {
        console.log("Error", error);
    }
};
const loadPlanetsData = () => {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(path.resolve(), "..", "server", "data", "kepler_data.csv"))
            .pipe(parse({
            comment: "#",
            columns: true,
        }))
            .on("data", async (data) => {
            if (isHabitablePlanets(data)) {
                savePlanet(data);
            }
        })
            .on("error", (err) => {
            console.log("err", err);
            reject(err);
        })
            .on("end", async (result) => {
            const planetsLength = (await getPlanetsData()).length;
            console.log(`Our planets length ${planetsLength}`);
            resolve(result);
        });
    });
};
export default {
    loadPlanetsData,
};
