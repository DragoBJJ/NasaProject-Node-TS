import { CtxType } from "../../types";
import { getPlanetsData } from "../../models/planets.model";

export const getAllPlanets = async ({ req, res }: CtxType) => {
  return res.status(200).json(await getPlanetsData());
};
