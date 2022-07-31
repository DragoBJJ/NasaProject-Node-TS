import { Launch } from "./models/launches.model";

export const handleError = (newLaunch: Launch) => {
  const errorArray = Object.values(newLaunch).filter((item) => !item);
  return errorArray.length > 0;
};
