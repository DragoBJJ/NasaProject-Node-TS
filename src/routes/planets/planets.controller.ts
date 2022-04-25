import { CtxType } from "../../types";
import data from "../../models/planets.model";

export const getAllPlanets = ({ req, res }: CtxType) => {
  return res.status(200).json(data.habitablePlanets);
};
