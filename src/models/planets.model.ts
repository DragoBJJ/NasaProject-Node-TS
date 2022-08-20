import { parse } from "csv-parse";
import path from "path";
import fs from "fs";

import { PlanetModel } from "./planets.mongo";

type PlanetType = {
  kepler_name: string;
  koi_disposition: string;
  koi_insol: number;
  koi_prad: number;
};

const isHabitablePlanets = (planet: any) => {
  const I = planet["koi_disposition"] === "CONFIRMED";
  const II = planet["koi_insol"] > 0.36 && planet["koi_insol"] < 1.11;
  const III = planet["koi_prad"] < 1.6;
  return I && II && III;
};

export const getPlanetsData = async () => {
  return await PlanetModel.find({});
};

const savePlanet = async (planet: any) => {
  try {
    await PlanetModel.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      { keplerName: planet.kepler_name },
      { upsert: true }
    );
  } catch (error) {
    console.log("Error", error);
  }
};

const loadPlanetsData = async () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(path.resolve(), "..", "server", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data: any) => {
        if (isHabitablePlanets(data)) {
          await savePlanet(data);
        }
      })
      .on("error", (err: Error) => {
        console.log("Planet Loading Error", err);
        reject(err);
      })
      .on("end", async (result: unknown) => {
        const planetsLength = (await getPlanetsData()).length;
        console.log(`Our planets length ${planetsLength}`);
        resolve(result);
      });
  });
};

export default {
  loadPlanetsData,
};
