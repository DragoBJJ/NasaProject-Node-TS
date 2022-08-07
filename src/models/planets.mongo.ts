import mongoose from "mongoose";

export interface Planet {
  keplerName: string;
}

const planetSchema = new mongoose.Schema<Planet>({
  keplerName: {
    type: String,
    required: true,
  },
});

export const PlanetModel = mongoose.model<Planet>("Planet", planetSchema);
