import { getPlanetsData } from "../../models/planets.model";
export const getAllPlanets = async ({ req, res }) => {
    return res.status(200).json(await getPlanetsData());
};
