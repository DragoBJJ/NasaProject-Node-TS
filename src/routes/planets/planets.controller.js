import { getPlanetsData } from "../../models/planets.model";
export const getAllPlanets = ({ req, res }) => {
    return res.status(200).json(getPlanetsData());
};
