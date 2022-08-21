import mongoose from "mongoose";
const LaunchSchema = new mongoose.Schema({
    flightNumber: {
        type: Number,
        required: true,
    },
    launchDate: {
        type: Date,
        required: true,
    },
    mission: {
        type: String,
        required: true,
    },
    rocket: {
        type: String,
        requried: true,
    },
    upcoming: {
        type: Boolean,
        requried: true,
    },
    success: {
        type: Boolean,
        requried: true,
        default: true,
    },
    customer: [String],
});
export const LaunchesModel = mongoose.model("Launch", LaunchSchema);
