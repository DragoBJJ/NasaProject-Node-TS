export const handleError = (newLaunch) => {
  const errorArray = Object.values(newLaunch).filter((item) => !item);
  return errorArray.length > 0;
};
