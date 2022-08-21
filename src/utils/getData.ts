import axios from "axios";

export const getSpaceXData = async () => {
  const SPACE_X_API_URL = process.env.SPACE_X_API_URL;
  if (!SPACE_X_API_URL) return;
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

  const launchData = response.data.docs.map((launch: any) => {
    const payloads = launch["payloads"];
    const customers = payloads.flatMap((payload: any) => {
      return payload["customers"];
    });

    const launchData = {
      flightNumber: launch["flight_number"],
      mission: launch["name"],
      rocket: launch["rocket"]["name"],
      launchDate: launch["date_local"],
      upcoming: launch["upcoming"],
      success: launch["success"],
      customers,
    };
    console.log("launchData", launchData);
    return launchData;
  });
};
