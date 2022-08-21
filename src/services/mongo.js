import mongoose from "mongoose";
export const connectToDB = async () => {
    const DATABASE_URL = process.env.API_DATABASE;
    if (!DATABASE_URL)
        return;
    await mongoose.connect(DATABASE_URL);
    mongoose.connection.on("open", () => {
        console.log("MongoDB connection ready");
    });
    mongoose.connection.on("error", (err) => {
        console.error("DB Error", err);
    });
};
