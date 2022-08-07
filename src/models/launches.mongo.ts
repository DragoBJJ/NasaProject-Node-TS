import mongoose from "mongoose";

interface Launch {
  flightNumber: number;
  mission: string;
  rocket: string;
  launchDate: Date;
  success: boolean;
  target: string;
  customer: string[];
  upcoming: boolean;
}

const LaunchSchema = new mongoose.Schema<Launch>({
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
  target: {
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

export const LaunchesModel = mongoose.model<Launch>("Launch", LaunchSchema);
