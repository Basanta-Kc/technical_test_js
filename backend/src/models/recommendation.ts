import mongoose, { Document, Schema } from "mongoose";

// Define the interface for type safety
export interface RecommendationDocument extends Document {
  user_id: string; // Reference to the user
  recommendations: string[]; // List of personalized recommendations
  createdAt: Date; // Timestamp of when the recommendation was created
}

// Create the schema
const RecommendationSchema: Schema = new Schema(
  {
    user_id: { type: String, required: true }, // User identifier
    recommendations: { type: [String], required: true }, // List of recommendations
    createdAt: { type: Date, default: Date.now }, // Auto-generated timestamp
  },
  {
    versionKey: false, // Disable the __v field
  }
);

// Export the model
export const Recommendation = mongoose.model<RecommendationDocument>(
  "Recommendation",
  RecommendationSchema
);
