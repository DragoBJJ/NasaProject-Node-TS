import { parse } from "csv-parse";
import path from "path";
import fs from "fs";
const isHabitablePlanets = (planet) => {
    const I = planet["koi_disposition"] === "CONFIRMED";
    const II = planet["koi_insol"] > 0.36 && planet["koi_insol"] < 1.11;
    const III = planet["koi_prad"] < 1.6;
    return I && II && III;
};
const habitablePlanets = [];
const loadPlanetsData = () => {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(path.resolve(), "..", "server", "data", "kepler_data.csv"))
            .pipe(parse({
            comment: "#",
            columns: true
        }))
            .on("data", (data) => {
            if (isHabitablePlanets(data)) {
                console.log("PLANET", data);
                habitablePlanets.push(data);
            }
        })
            .on("error", (err) => {
            console.log("err", err);
            reject(err);
        })
            .on("end", (result) => {
            resolve(result);
        });
    });
};
export default {
    habitablePlanets,
    loadPlanetsData
};
